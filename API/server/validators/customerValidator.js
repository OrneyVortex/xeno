const yup = require('yup');

// Define the schema for customer validation
const customerSchema = yup.object().shape({
  id: yup.string().required('Customer ID is required'),
  name: yup.string().required('Customer name is required'),
  email: yup.string().email('Must be a valid email').required('Customer email is required'),
  total_spend: yup.number().default(0).min(0, 'Total spend must be at least 0'),
  last_visit: yup.date().default(() => new Date()),
  total_visits: yup.number().default(0).min(0, 'Total visits must be at least 0')
});

// Function to validate customer data
const validateCustomer = async (data) => {
  try {
    const validatedCustomer = await customerSchema.validate(data, { abortEarly: false });
    return validatedCustomer;
  } catch (err) {
    throw new Error(err.errors.join(', '));
  }
};

module.exports = validateCustomer;
