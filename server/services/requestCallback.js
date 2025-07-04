const RequestCallback = require("../models/requestCallback");
const { sendEmail } = require("../services/emailService"); // Assuming sendEmail function is already implemented

// Helper function to save callback data and send an email
// Main function to handle the request callback
const requestCallback = async (req, res) => {
    try {
        const { email, fullName, phone } = req.body;

        // Create a new callback request
        const callbackData = new RequestCallback(req.body);

        // Save the callback request and send email
        const savedCallback = await saveCallbackAndSendEmail(callbackData);

        // Respond with success message
        res.status(200).json({
            message: "Callback request saved and email sent successfully!",
            data: savedCallback,
        });
    } catch (error) {
        console.error("Error handling callback request:", error);
        res.status(500).json({
            message: "An error occurred while processing the callback request.",
        });
    }
};

const saveCallbackAndSendEmail = async (callbackData) => {
  try {
    // Save the callback data in the database
    const savedCallback = await callbackData.save();

    // Extract data
    const { fullName, email, phone } = callbackData;

    // Team email - Professional internal notification
    const teamEmailSubject = "🔔 New Callback Request - Action Required";
    const teamEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Callback Request</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">📞 New Callback Request</h1>
            <p style="color: #e8e8e8; margin: 8px 0 0 0; font-size: 14px;">Immediate attention required</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px;">
            <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
              <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h3>
              
              <div style="margin-bottom: 12px;">
                <span style="display: inline-block; width: 100px; font-weight: 600; color: #555555;">👤 Name:</span>
                <span style="color: #333333; font-size: 16px;">${fullName}</span>
              </div>
              
              <div style="margin-bottom: 12px;">
                <span style="display: inline-block; width: 100px; font-weight: 600; color: #555555;">📧 Email:</span>
                <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px;">${email}</a>
              </div>
              
              <div style="margin-bottom: 0;">
                <span style="display: inline-block; width: 100px; font-weight: 600; color: #555555;">📞 Phone:</span>
                <a href="tel:${phone}" style="color: #667eea; text-decoration: none; font-size: 16px;">${phone}</a>
              </div>
            </div>
            
            <!-- Success Status -->
            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; text-align: center;">
              <span style="color: #155724; font-weight: 600;">✅ Request saved successfully in database</span>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; margin: 0; font-size: 12px;">
              Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // User confirmation email - Professional customer-facing
    const userEmailSubject = "✅ Callback Request Confirmed - We'll Be In Touch Soon!";
    const userEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Callback Request Confirmed</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Thank You, ${fullName}!</h1>
            <p style="color: #e8f4f8; margin: 10px 0 0 0; font-size: 16px;">Your callback request has been received</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 25px; border-radius: 16px; margin: 0 auto 20px auto; max-width: 300px; box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3);">
                <div style="font-size: 48px; margin-bottom: 10px;">📞</div>
                <div style="color: #ffffff; font-size: 18px; font-weight: 600; margin-bottom: 5px;">Request Confirmed!</div>
                <div style="color: #e8f4f8; font-size: 14px;">We'll call you back soon</div>
              </div>
              <p style="color: #666666; margin: 0; font-size: 16px; line-height: 1.6;">
                We've received your callback request and our team will reach out to you within 24 hours.
              </p>
            </div>
            
            <!-- Request Details -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #333333; margin: 0 0 20px 0; font-size: 18px; text-align: center;">📋 Request Details</h3>
              
              <div style="border-bottom: 1px solid #e9ecef; padding-bottom: 15px; margin-bottom: 15px;">
                <span style="display: block; color: #666666; font-size: 14px; margin-bottom: 5px;">Contact Phone Number</span>
                <span style="color: #333333; font-size: 16px; font-weight: 600;">${phone}</span>
              </div>
              
              <div>
                <span style="display: block; color: #666666; font-size: 14px; margin-bottom: 5px;">Email Address</span>
                <span style="color: #333333; font-size: 16px; font-weight: 600;">${email}</span>
              </div>
            </div>
            
            <!-- Next Steps -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 25px; color: #ffffff; text-align: center;">
              <h3 style="margin: 0 0 15px 0; font-size: 18px;">🚀 What's Next?</h3>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.9;">
                Our team will review your request and call you at <strong>${phone}</strong> within 24 hours during business hours (9 AM - 6 PM).
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #666666; margin: 0 0 10px 0; font-size: 14px;">
              Have questions? Feel free to reach out to us anytime.
            </p>
            <p style="color: #999999; margin: 0; font-size: 12px;">
              This is an automated confirmation. Please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send both emails in parallel
    await Promise.all([
      sendEmail(teamEmailSubject, teamEmailBody),       // to team
      sendEmail(userEmailSubject, userEmailBody, email) // to user
    ]);

    return savedCallback;
  } catch (error) {
    console.error("Error in saveCallbackAndSendEmail:", error);
    throw new Error("An error occurred while saving the callback request and sending emails.");
  }
};

const getInTouch = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Team email - Professional internal notification
    const teamEmailSubject = "💬 New Contact Form Submission - Customer Inquiry";
    const teamEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">💬 New Contact Form Submission</h1>
            <p style="color: #ffe8e8; margin: 8px 0 0 0; font-size: 14px;">Customer inquiry received</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px;">
            <!-- Customer Info -->
            <div style="background-color: #f8f9fa; border-left: 4px solid #ff6b6b; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
              <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">👤 Customer Information</h3>
              
              <div style="margin-bottom: 12px;">
                <span style="display: inline-block; width: 80px; font-weight: 600; color: #555555;">Name:</span>
                <span style="color: #333333; font-size: 16px;">${name}</span>
              </div>
              
              <div style="margin-bottom: 0;">
                <span style="display: inline-block; width: 80px; font-weight: 600; color: #555555;">Email:</span>
                <a href="mailto:${email}" style="color: #ff6b6b; text-decoration: none; font-size: 16px;">${email}</a>
              </div>
            </div>
            
            <!-- Message -->
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">📝 Customer Message</h3>
              <div style="background-color: #ffffff; border-radius: 4px; padding: 15px; border-left: 3px solid #fdcb6e;">
                <p style="color: #333333; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <!-- Action Required -->
            <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 8px; padding: 15px; text-align: center;">
              <span style="color: #0c5460; font-weight: 600;">⚡ Action Required: Please respond within 24 hours</span>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; margin: 0; font-size: 12px;">
              Received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // User confirmation email - Professional customer-facing
    const userEmailSubject = "✅ Message Received - We'll Get Back to You Soon!";
    const userEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #a8e6cf 0%, #4ecdc4 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Thank You, ${name}!</h1>
            <p style="color: #e8f5f3; margin: 10px 0 0 0; font-size: 16px;">Your message has been received</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: linear-gradient(135deg, #a8e6cf 0%, #4ecdc4 100%); padding: 25px; border-radius: 16px; margin: 0 auto 20px auto; max-width: 300px; box-shadow: 0 8px 25px rgba(78, 205, 196, 0.3);">
                <div style="font-size: 48px; margin-bottom: 10px;">💬</div>
                <div style="color: #ffffff; font-size: 18px; font-weight: 600; margin-bottom: 5px;">Message Received!</div>
                <div style="color: #e8f5f3; font-size: 14px;">We'll respond within 24 hours</div>
              </div>
              <p style="color: #666666; margin: 0; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to us. We've received your message and our team will respond within 24 hours.
              </p>
            </div>
            
            <!-- Message Summary -->
            <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #333333; margin: 0 0 20px 0; font-size: 18px; text-align: center;">📋 Your Message Summary</h3>
              
              <div style="border-bottom: 1px solid #e9ecef; padding-bottom: 15px; margin-bottom: 15px;">
                <span style="display: block; color: #666666; font-size: 14px; margin-bottom: 5px;">From</span>
                <span style="color: #333333; font-size: 16px; font-weight: 600;">${name} (${email})</span>
              </div>
              
              <div>
                <span style="display: block; color: #666666; font-size: 14px; margin-bottom: 10px;">Message</span>
                <div style="background-color: #ffffff; border-radius: 4px; padding: 15px; border-left: 3px solid #4ecdc4;">
                  <p style="color: #333333; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            </div>
            
            <!-- Response Time -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 25px; color: #ffffff; text-align: center;">
              <h3 style="margin: 0 0 15px 0; font-size: 18px;">⏰ Response Time</h3>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.9;">
                We typically respond to all inquiries within <strong>24 hours</strong> during business days. 
                For urgent matters, please call us directly.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #666666; margin: 0 0 10px 0; font-size: 14px;">
              Need immediate assistance? Don't hesitate to contact us.
            </p>
            <p style="color: #999999; margin: 0; font-size: 12px;">
              This is an automated confirmation. Please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send both emails in parallel
    await Promise.all([
      sendEmail(teamEmailSubject, teamEmailBody),
      sendEmail(userEmailSubject, userEmailBody, email),
    ]);

    return res.status(200).json({ message: "Message sent to both user and team successfully!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
};


module.exports = {
    requestCallback,
    getInTouch
};
