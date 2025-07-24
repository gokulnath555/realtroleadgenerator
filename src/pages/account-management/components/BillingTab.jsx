import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BillingTab = ({ user, onUpdatePaymentMethod }) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState({});

  // Mock billing history data
  const billingHistory = [
    {
      id: 'inv_001',
      date: '2025-01-01',
      description: 'Premium Plan - Monthly',
      amount: 79.00,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'inv_002',
      date: '2024-12-01',
      description: 'Premium Plan - Monthly',
      amount: 79.00,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'inv_003',
      date: '2024-11-01',
      description: 'Starter Plan - Monthly',
      amount: 29.00,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'inv_004',
      date: '2024-10-01',
      description: 'Starter Plan - Monthly',
      amount: 29.00,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'inv_005',
      date: '2024-09-01',
      description: 'Free Plan Upgrade',
      amount: 0.00,
      status: 'paid',
      downloadUrl: '#'
    }
  ];

  // Mock payment methods
  const paymentMethods = [
    {
      id: 'card_001',
      type: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true
    },
    {
      id: 'card_002',
      type: 'mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    }
  ];

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardForm(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateCardForm = () => {
    const newErrors = {};

    if (!cardForm.cardNumber.replace(/\s/g, '') || cardForm.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!cardForm.expiryDate || cardForm.expiryDate.length < 5) {
      newErrors.expiryDate = 'Please enter a valid expiry date';
    }

    if (!cardForm.cvv || cardForm.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!cardForm.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    if (!cardForm.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!cardForm.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!cardForm.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!cardForm.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    
    if (!validateCardForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onUpdatePaymentMethod({
        type: 'add',
        cardData: {
          ...cardForm,
          last4: cardForm.cardNumber.slice(-4),
          type: cardForm.cardNumber.startsWith('4') ? 'visa' : 'mastercard'
        }
      });
      
      // Reset form
      setCardForm({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        billingAddress: '',
        city: '',
        state: '',
        zipCode: ''
      });
      setShowAddCard(false);
    } catch (error) {
      setErrors({ submit: 'Failed to add payment method. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCard = async (cardId) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        onUpdatePaymentMethod({
          type: 'remove',
          cardId
        });
      } catch (error) {
        console.error('Failed to remove payment method:', error);
      }
    }
  };

  const handleSetDefault = async (cardId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpdatePaymentMethod({
        type: 'setDefault',
        cardId
      });
    } catch (error) {
      console.error('Failed to set default payment method:', error);
    }
  };

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getNextBillingAmount = () => {
    const currentPlan = user?.subscriptionTier || 'Free';
    const amounts = { Free: 0, Starter: 29, Premium: 79 };
    return amounts[currentPlan] || 0;
  };

  const getNextBillingDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Next Billing Info */}
      <div className="p-6 bg-card border border-border rounded-lg">
        <h3 className="text-lg font-semibold text-foreground mb-4">Next Billing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Next Charge</p>
            <p className="text-2xl font-bold text-foreground">${getNextBillingAmount()}.00</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Billing Date</p>
            <p className="text-lg font-semibold text-foreground">{getNextBillingDate()}</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddCard(!showAddCard)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Card
          </Button>
        </div>

        {/* Existing Payment Methods */}
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg">
                  <Icon name={getCardIcon(method.type)} size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground">
                      •••• •••• •••• {method.last4}
                    </p>
                    {method.isDefault && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                  >
                    Set Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCard(method.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Card Form */}
        {showAddCard && (
          <div className="p-6 bg-muted/30 border border-border rounded-lg">
            <h4 className="text-md font-medium text-foreground mb-4">Add New Payment Method</h4>
            
            <form onSubmit={handleAddCard} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Card Number"
                  name="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardForm.cardNumber}
                  onChange={handleCardInputChange}
                  error={errors.cardNumber}
                  required
                />
                
                <Input
                  label="Cardholder Name"
                  name="cardholderName"
                  type="text"
                  placeholder="John Doe"
                  value={cardForm.cardholderName}
                  onChange={handleCardInputChange}
                  error={errors.cardholderName}
                  required
                />
                
                <Input
                  label="Expiry Date"
                  name="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={cardForm.expiryDate}
                  onChange={handleCardInputChange}
                  error={errors.expiryDate}
                  required
                />
                
                <Input
                  label="CVV"
                  name="cvv"
                  type="text"
                  placeholder="123"
                  value={cardForm.cvv}
                  onChange={handleCardInputChange}
                  error={errors.cvv}
                  required
                />
              </div>

              <div className="space-y-4">
                <h5 className="text-sm font-medium text-foreground">Billing Address</h5>
                
                <Input
                  label="Address"
                  name="billingAddress"
                  type="text"
                  placeholder="123 Main Street"
                  value={cardForm.billingAddress}
                  onChange={handleCardInputChange}
                  error={errors.billingAddress}
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    name="city"
                    type="text"
                    placeholder="New York"
                    value={cardForm.city}
                    onChange={handleCardInputChange}
                    error={errors.city}
                    required
                  />
                  
                  <Input
                    label="State"
                    name="state"
                    type="text"
                    placeholder="NY"
                    value={cardForm.state}
                    onChange={handleCardInputChange}
                    error={errors.state}
                    required
                  />
                  
                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    type="text"
                    placeholder="10001"
                    value={cardForm.zipCode}
                    onChange={handleCardInputChange}
                    error={errors.zipCode}
                    required
                  />
                </div>
              </div>

              {errors.submit && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-error" />
                    <p className="text-sm text-error">{errors.submit}</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddCard(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  loading={isLoading}
                  iconName="CreditCard"
                  iconPosition="left"
                >
                  Add Payment Method
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Billing History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export All
          </Button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Description</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((invoice, index) => (
                <tr key={invoice.id} className={index !== billingHistory.length - 1 ? 'border-b border-border' : ''}>
                  <td className="p-4 text-sm text-foreground">{formatDate(invoice.date)}</td>
                  <td className="p-4 text-sm text-foreground">{invoice.description}</td>
                  <td className="p-4 text-sm font-medium text-foreground">${invoice.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      Paid
                    </span>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      onClick={() => window.open(invoice.downloadUrl, '_blank')}
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {billingHistory.map((invoice) => (
            <div key={invoice.id} className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{formatDate(invoice.date)}</span>
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Paid
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{invoice.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">${invoice.amount.toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => window.open(invoice.downloadUrl, '_blank')}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingTab;