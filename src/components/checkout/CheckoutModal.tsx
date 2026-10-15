import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  AlertCircle, 
  ShoppingBag, 
  CreditCard,
  Banknote,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { OrderDetails } from '../../types';

interface CheckoutModalProps {
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderSuccess }) => {
  const {
    cart,
    subtotal,
    deliveryFee,
    discountAmount,
    finalTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    selectedCity,
    pincode: initialPin,
    setLastOrder
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState(selectedCity.split(' ')[0] || 'Bengaluru');
  const [pincode, setPincode] = useState(initialPin || '560038');
  const [deliverySlot, setDeliverySlot] = useState('Today (2-Hour Express Delivery)');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (at least 3 characters)';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!address.trim() || address.trim().length < 8) {
      errs.address = 'Please enter your complete street / house address';
    }
    const cleanPin = pincode.replace(/\D/g, '');
    if (!cleanPin || cleanPin.length !== 6) {
      errs.pincode = 'Please enter a valid 6-digit PIN code';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `KSM-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: OrderDetails = {
        orderId,
        items: [...cart],
        subtotal,
        deliveryFee,
        discount: discountAmount,
        total: finalTotal,
        customerName: fullName,
        phone,
        address,
        apartment,
        city,
        pincode,
        deliverySlot,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (UPI/Cash at Doorstep)' : 'Demo Online UPI / Card',
        orderDate: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setConfirmedOrder(newOrder);
      setLastOrder(newOrder);
      clearCart();
      setIsSubmitting(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      onOrderSuccess(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setConfirmedOrder(null);
          }}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 flex items-center justify-center transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          /* Confirmation Receipt View */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Order Placed Successfully (Demo)
              </span>
              <h2 className="text-2xl font-bold text-stone-900 mt-2">
                Thank You, {confirmedOrder.customerName}!
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Order ID: <strong className="text-stone-900 font-mono">{confirmedOrder.orderId}</strong> · Placed on {confirmedOrder.orderDate}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 rounded-2xl p-6 text-left border border-stone-200 text-xs space-y-4">
              <div className="grid grid-cols-2 gap-4 border-b border-stone-200 pb-4">
                <div>
                  <span className="text-stone-400 block font-medium">Delivery Address:</span>
                  <p className="font-semibold text-stone-800 mt-0.5">
                    {confirmedOrder.apartment ? `${confirmedOrder.apartment}, ` : ''}{confirmedOrder.address}
                  </p>
                  <p className="text-stone-600">{confirmedOrder.city} - {confirmedOrder.pincode}</p>
                  <p className="text-stone-500 mt-1">Mobile: +91 {confirmedOrder.phone}</p>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Scheduled Delivery:</span>
                  <p className="font-semibold text-emerald-700 mt-0.5">{confirmedOrder.deliverySlot}</p>
                  <span className="text-stone-400 block font-medium mt-2">Payment Method:</span>
                  <p className="font-semibold text-stone-800">{confirmedOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Itemized Bill ({confirmedOrder.items.length} items)
                </span>
                {confirmedOrder.items.map((i) => (
                  <div key={i.product.id} className="flex justify-between items-center text-stone-700">
                    <span className="truncate pr-2">{i.product.name} × {i.quantity}</span>
                    <span className="font-semibold tabular-nums shrink-0">₹{i.product.price * i.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-stone-200 pt-3 space-y-1">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="tabular-nums">₹{confirmedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Delivery Fee</span>
                  <span className="tabular-nums">{confirmedOrder.deliveryFee === 0 ? 'FREE' : `₹${confirmedOrder.deliveryFee}`}</span>
                </div>
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="tabular-nums">-₹{confirmedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                  <span>Total Amount Due</span>
                  <span className="text-emerald-800 tabular-nums">₹{confirmedOrder.total}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 max-w-sm mx-auto">
              * Demonstration Confirmation: No real delivery rider will dispatch. No payment was charged. You may continue testing the storefront freely!
            </p>

            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setConfirmedOrder(null);
              }}
              className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs transition-colors inline-block"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <div>
            {/* Header */}
            <div className="p-6 border-b border-stone-200 bg-stone-50/70">
              <h2 className="text-xl font-bold text-stone-900">
                Express Checkout
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Review your delivery address and schedule your preferred arrival slot.
              </p>

              {/* Demo Disclaimer Alert */}
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Demo Website Notice:</strong>
                  This is a demonstration checkout. No actual money or credit card information is collected. Pay on Delivery / Demo UPI is pre-selected for testing.
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
              
              {/* Customer Contact Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>1. Contact & Recipient</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-3 py-2 bg-stone-50 border rounded-xl text-xs focus:bg-white focus:outline-none ${
                        errors.fullName ? 'border-rose-500' : 'border-stone-300 focus:border-emerald-600'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Mobile Number (10 Digits) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full pl-11 pr-3 py-2 bg-stone-50 border rounded-xl text-xs focus:bg-white focus:outline-none ${
                          errors.phone ? 'border-rose-500' : 'border-stone-300 focus:border-emerald-600'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>2. Delivery Destination</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Flat / House / Apartment / Building *
                    </label>
                    <input
                      type="text"
                      placeholder="Flat 402, Green Orchid Apartments"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Street Address & Landmark *
                    </label>
                    <input
                      type="text"
                      placeholder="12th Main Road, HAL 2nd Stage, Indiranagar"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`w-full px-3 py-2 bg-stone-50 border rounded-xl text-xs focus:bg-white focus:outline-none ${
                        errors.address ? 'border-rose-500' : 'border-stone-300 focus:border-emerald-600'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        PIN Code (6 Digits) *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="560038"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className={`w-full px-3 py-2 bg-stone-50 border rounded-xl text-xs focus:bg-white focus:outline-none ${
                          errors.pincode ? 'border-rose-500' : 'border-stone-300 focus:border-emerald-600'
                        }`}
                      />
                      {errors.pincode && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Slot Selection */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>3. Choose Delivery Slot</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Today (2-Hour Express Delivery)',
                    'Tomorrow Morning (07:00 AM – 10:00 AM)',
                    'Tomorrow Afternoon (01:00 PM – 04:00 PM)',
                    'Tomorrow Evening (06:00 PM – 09:00 PM)'
                  ].map((slot) => (
                    <label
                      key={slot}
                      className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                        deliverySlot === slot
                          ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-semibold'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliverySlot"
                        checked={deliverySlot === slot}
                        onChange={() => setDeliverySlot(slot)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-[11px]">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Mode */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>4. Payment Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label
                    className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-semibold'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="block font-semibold">Pay on Delivery (Recommended)</span>
                      <span className="text-[10px] text-stone-500 font-normal">
                        Pay via UPI, Card, or Cash when groceries arrive at your doorstep.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-colors ${
                      paymentMethod === 'online'
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-semibold'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="block font-semibold">Demo Instant UPI / Netbanking</span>
                      <span className="text-[10px] text-stone-500 font-normal">
                        Simulated one-click payment verification for testing.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Cart Items ({cart.length})</span>
                  <span className="tabular-nums font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Charges</span>
                  <span className="tabular-nums font-semibold">
                    {deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span className="tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                  <span>Total Amount Payable</span>
                  <span className="text-base text-emerald-800 tabular-nums">₹{finalTotal}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-400 text-white font-bold rounded-xl text-sm transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Demo Order...</span>
                ) : (
                  <>
                    <span>Place Order · ₹{finalTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
