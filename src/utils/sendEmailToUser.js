import emailjs from 'emailjs-com';

const sendEmailToUser = (orderDetails) => {
  // Step 1: Create HTML list of items
const itemListHTML = orderDetails.cartItems
    .map(
      (item) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px;">${item.name}</td>
        <td style="border: 1px solid #ddd; padding: 10px;">
          <img src="${item.image}" alt="${item.name}" width="80" style="display:block; margin: 10px auto;" />
        </td>
        <td style="border: 1px solid #ddd; padding: 10px;">₹${item.price}</td>
        <td style="border: 1px solid #ddd; padding: 10px;">${item.quantity}</td>
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>₹${item.price * item.quantity}</strong></td>
      </tr>
    `
    )
    .join('');

  // Step 2: Prepare email data
  const templateParams = {
    user_email: orderDetails.userEmail,
    user_name: orderDetails.customerInfo.name,
    user_address: orderDetails.customerInfo.address,
    total_amount: `₹${orderDetails.totalAmount}`,
    item_list: itemListHTML, // this is the full HTML content
  };

  console.log("templateParams", templateParams);

  // Step 3: Send email
  emailjs
    .send(
      'service_cwhcl69',       // your service ID
      'template_e1lvlbj',      // your template ID
      templateParams,
      's6_G7Ueh3tyQKISrk'      // your public key
    )
    .then((result) => {
      console.log('✅ Email sent:', result.text);
    })
    .catch((error) => {
      console.error('❌ Email send error:', error.text);
    });
};

export default sendEmailToUser;
