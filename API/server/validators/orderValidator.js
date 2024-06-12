const yup = require('yup');

// Define the schema for order validation
const orderSchema = yup.object().shape({
  id: yup.string().required('Order ID is required'),
  customerId: yup.string().required('Customer ID is required'),
  amount: yup.number().required('Order amount is required').min(0, 'Amount must be at least 0'),
  date: yup.date().default(() => new Date())
});

// Function to validate order data
const validateOrder = async (data) => {
  try {
    const validatedOrder = await orderSchema.validate(data, { abortEarly: false });
    return validatedOrder;
  } catch (err) {
    throw new Error(err.errors.join(', '));
  }
};

module.exports = validateOrder;
