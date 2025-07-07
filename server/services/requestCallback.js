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

    // Team email - Cyberpunk internal notification
    const teamEmailSubject = "🔥 PROTOCOL INITIATED - New Callback Request Detected";
    const teamEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BUZZBANDITS - Callback Protocol</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Courier New', monospace; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%); color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); border: 2px solid #00ffff; border-radius: 0; box-shadow: 0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); padding: 30px 20px; text-align: center; position: relative; border-bottom: 2px solid #00ffff;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: scan 2s linear infinite;"></div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 10px;">
              <div style="width: 8px; height: 8px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff; animation: pulse 1s infinite;"></div>
              <h1 style="color: #00ffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-shadow: 0 0 10px #00ffff;">BUZZBANDITS</h1>
              <div style="width: 8px; height: 8px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff; animation: pulse 1s infinite;"></div>
            </div>
            <p style="color: #00ffff; margin: 0; font-size: 14px; letter-spacing: 1px; opacity: 0.8;">[SYSTEM ONLINE] - CALLBACK PROTOCOL INITIATED</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px; background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%); position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(90deg, transparent, transparent 98px, rgba(0, 255, 255, 0.03) 100px); pointer-events: none;"></div>
            
            <!-- Status Alert -->
            <div style="background: linear-gradient(135deg, #001a1a 0%, #003333 100%); border: 1px solid #00ffff; padding: 15px; margin-bottom: 25px; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent); animation: sweep 3s ease-in-out infinite;"></div>
              <div style="display: flex; align-items: center; gap: 10px; position: relative;">
                <div style="width: 12px; height: 12px; background: #00ff00; border-radius: 50%; box-shadow: 0 0 10px #00ff00; animation: pulse 1s infinite;"></div>
                <span style="color: #00ff00; font-weight: 600; font-size: 14px; letter-spacing: 1px;">[INCOMING TRANSMISSION] - NEW TARGET ACQUIRED</span>
              </div>
            </div>
            
            <!-- Target Data -->
            <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); border: 1px solid #00ffff; padding: 25px; margin-bottom: 25px; position: relative;">
              <div style="position: absolute; top: 0; right: 0; width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid #00ffff; border-top: 20px solid #00ffff;"></div>
              <h3 style="color: #00ffff; margin: 0 0 20px 0; font-size: 18px; letter-spacing: 1px; text-transform: uppercase;">〉 TARGET PROFILE</h3>
              
              <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 15px;">
                <div style="width: 4px; height: 4px; background: #00ffff; transform: rotate(45deg);"></div>
                <span style="color: #00ffff; font-weight: 600; min-width: 120px; font-size: 14px;">IDENTIFIER:</span>
                <span style="color: #ffffff; font-size: 16px; font-weight: 600;">${fullName}</span>
              </div>
              
              <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 15px;">
                <div style="width: 4px; height: 4px; background: #00ffff; transform: rotate(45deg);"></div>
                <span style="color: #00ffff; font-weight: 600; min-width: 120px; font-size: 14px;">COMM_LINK:</span>
                <a href="mailto:${email}" style="color: #00ff00; text-decoration: none; font-size: 16px; text-shadow: 0 0 5px #00ff00;">${email}</a>
              </div>
              
              <div style="margin-bottom: 0; display: flex; align-items: center; gap: 15px;">
                <div style="width: 4px; height: 4px; background: #00ffff; transform: rotate(45deg);"></div>
                <span style="color: #00ffff; font-weight: 600; min-width: 120px; font-size: 14px;">FREQ_CODE:</span>
                <a href="tel:${phone}" style="color: #00ff00; text-decoration: none; font-size: 16px; text-shadow: 0 0 5px #00ff00;">${phone}</a>
              </div>
            </div>
            
            <!-- Action Required -->
            <div style="background: linear-gradient(135deg, #1a0000 0%, #330000 100%); border: 1px solid #ff0040; padding: 20px; text-align: center; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #ff0040, transparent); animation: scan 1.5s linear infinite;"></div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                <div style="width: 8px; height: 8px; background: #ff0040; border-radius: 50%; box-shadow: 0 0 10px #ff0040; animation: pulse 0.5s infinite;"></div>
                <span style="color: #ff0040; font-weight: 600; font-size: 14px; letter-spacing: 1px;">[URGENT] INITIATE CONTACT PROTOCOL WITHIN 24H</span>
                <div style="width: 8px; height: 8px; background: #ff0040; border-radius: 50%; box-shadow: 0 0 10px #ff0040; animation: pulse 0.5s infinite;"></div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); padding: 20px; text-align: center; border-top: 1px solid #00ffff; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #00ffff, transparent);"></div>
            <p style="color: #00ffff; margin: 0; font-size: 12px; letter-spacing: 1px; opacity: 0.7;">
              TIMESTAMP: ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} | SYSTEM_STATUS: OPERATIONAL
            </p>
          </div>
        </div>
        
        <style>
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes sweep {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        </style>
      </body>
      </html>
    `;

    // User confirmation email - Cyberpunk customer-facing
    const userEmailSubject = "⚡ PROTOCOL CONFIRMED - Connection Established | BUZZBANDITS";
    const userEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BUZZBANDITS - Protocol Confirmed</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Courier New', monospace; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%); color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); border: 2px solid #00ffff; border-radius: 0; box-shadow: 0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); padding: 40px 20px; text-align: center; position: relative; border-bottom: 2px solid #00ffff;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: scan 2s linear infinite;"></div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
              <div style="width: 10px; height: 10px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 15px #00ffff; animation: pulse 1s infinite;"></div>
              <h1 style="color: #00ffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 3px; text-shadow: 0 0 15px #00ffff;">BUZZBANDITS</h1>
              <div style="width: 10px; height: 10px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 15px #00ffff; animation: pulse 1s infinite;"></div>
            </div>
            <h2 style="color: #00ff00; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 2px; text-shadow: 0 0 10px #00ff00;">WELCOME, ${fullName.toUpperCase()}</h2>
            <p style="color: #00ffff; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 1px; opacity: 0.8;">[CONNECTION ESTABLISHED] - CALLBACK PROTOCOL ACTIVE</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px; background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%); position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(90deg, transparent, transparent 98px, rgba(0, 255, 255, 0.03) 100px); pointer-events: none;"></div>
            
            <!-- Success Status -->
            <div style="text-align: center; margin-bottom: 30px; position: relative;">
              <div style="background: linear-gradient(135deg, #001a1a 0%, #003333 100%); border: 2px solid #00ffff; padding: 30px; margin: 0 auto 25px auto; max-width: 350px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent); animation: sweep 3s ease-in-out infinite;"></div>
                <div style="font-size: 48px; margin-bottom: 15px; position: relative;">📞</div>
                <div style="color: #00ff00; font-size: 20px; font-weight: 600; margin-bottom: 10px; letter-spacing: 1px; text-shadow: 0 0 10px #00ff00; position: relative;">PROTOCOL CONFIRMED</div>
                <div style="color: #00ffff; font-size: 14px; letter-spacing: 1px; opacity: 0.9; position: relative;">Transmission successful - Standing by</div>
              </div>
              <p style="color: #ffffff; margin: 0; font-size: 16px; line-height: 1.6; opacity: 0.9;">
                Your callback request has been processed and integrated into our digital dominance system. 
                Our team will initiate contact within 24 hours.
              </p>
            </div>
            
            <!-- Request Details -->
            <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); border: 1px solid #00ffff; padding: 25px; margin-bottom: 25px; position: relative;">
              <div style="position: absolute; top: 0; right: 0; width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid #00ffff; border-top: 15px solid #00ffff;"></div>
              <h3 style="color: #00ffff; margin: 0 0 20px 0; font-size: 18px; letter-spacing: 1px; text-transform: uppercase;">〉 TRANSMISSION DATA</h3>
              
              <div style="border-bottom: 1px solid rgba(0, 255, 255, 0.2); padding-bottom: 15px; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                  <div style="width: 4px; height: 4px; background: #00ffff; transform: rotate(45deg);"></div>
                  <span style="color: #00ffff; font-size: 14px; letter-spacing: 1px;">CALLBACK_FREQUENCY</span>
                </div>
                <span style="color: #00ff00; font-size: 18px; font-weight: 600; margin-left: 20px; text-shadow: 0 0 5px #00ff00;">${phone}</span>
              </div>
              
              <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                  <div style="width: 4px; height: 4px; background: #00ffff; transform: rotate(45deg);"></div>
                  <span style="color: #00ffff; font-size: 14px; letter-spacing: 1px;">BACKUP_CHANNEL</span>
                </div>
                <span style="color: #00ff00; font-size: 18px; font-weight: 600; margin-left: 20px; text-shadow: 0 0 5px #00ff00;">${email}</span>
              </div>
            </div>
            
            <!-- Next Steps -->
            <div style="background: linear-gradient(135deg, #1a0040 0%, #330080 100%); border: 1px solid #8000ff; padding: 25px; color: #ffffff; text-align: center; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #8000ff, transparent); animation: scan 2s linear infinite;"></div>
              <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #8000ff; letter-spacing: 1px; text-shadow: 0 0 10px #8000ff; position: relative;">〉 NEXT-GEN PROTOCOL</h3>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.9; position: relative;">
                Our AI-powered system will analyze your requirements and deploy the optimal team member to contact you at 
                <span style="color: #00ff00; font-weight: 600; text-shadow: 0 0 5px #00ff00;">${phone}</span> within 24 hours during operational hours (09:00 - 18:00).
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); padding: 25px; text-align: center; border-top: 1px solid #00ffff; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #00ffff, transparent);"></div>
            <p style="color: #00ffff; margin: 0 0 10px 0; font-size: 14px; letter-spacing: 1px; opacity: 0.8;">
              NEED IMMEDIATE ASSISTANCE? CONTACT US DIRECTLY
            </p>
            <p style="color: #666666; margin: 0; font-size: 12px; letter-spacing: 1px; opacity: 0.6;">
              [AUTOMATED RESPONSE] - DO NOT REPLY TO THIS TRANSMISSION
            </p>
          </div>
        </div>
        
        <style>
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes sweep {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        </style>
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
    // Team email - Futuristic cyberpunk internal notification
    const teamEmailSubject = "🚨 NEURAL LINK ESTABLISHED - Contact Protocol Initiated";
    const teamEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BUZZBANDITS - Neural Contact Interface</title>
        <style>
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes sweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
            50% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.6); }
          }
          @keyframes matrix {
            0% { opacity: 0.1; }
            50% { opacity: 0.3; }
            100% { opacity: 0.1; }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Courier New', monospace; background: radial-gradient(circle at center, #0a0a0a 0%, #000000 100%); color: #ffffff; overflow-x: hidden;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #001122 100%); border: 2px solid #00ffff; border-radius: 8px; box-shadow: 0 0 40px rgba(0, 255, 255, 0.4), inset 0 0 40px rgba(0, 255, 255, 0.1); overflow: hidden; position: relative;">
          
          <!-- Matrix Background Effect -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px); animation: matrix 3s linear infinite; pointer-events: none;"></div>
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #001122 0%, #002244 100%); padding: 30px 20px; text-align: center; position: relative; border-bottom: 2px solid #00ffff;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: scan 2s linear infinite;"></div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
              <div style="width: 10px; height: 10px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 15px #00ffff; animation: pulse 1s infinite;"></div>
              <h1 style="color: #00ffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 3px; text-shadow: 0 0 15px #00ffff;">BUZZBANDITS</h1>
              <div style="width: 10px; height: 10px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 15px #00ffff; animation: pulse 1s infinite;"></div>
            </div>
            <p style="color: #00ffff; margin: 0; font-size: 14px; letter-spacing: 2px; opacity: 0.8; text-transform: uppercase;">[NEURAL INTERFACE] - TRANSMISSION INTERCEPTED</p>
            <div style="margin-top: 15px; font-size: 12px; color: #00ffff; opacity: 0.6;">
              >>> ESTABLISHING SECURE CONNECTION... <<<
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px; background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%); position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(0, 255, 255, 0.02) 50px); pointer-events: none;"></div>
            
            <!-- System Alert -->
            <div style="background: linear-gradient(135deg, #001122 0%, #002244 100%); border: 1px solid #00ffff; padding: 20px; margin-bottom: 25px; position: relative; overflow: hidden; border-radius: 4px;">
              <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent); animation: sweep 3s ease-in-out infinite;"></div>
              <div style="display: flex; align-items: center; gap: 15px; position: relative;">
                <div style="width: 16px; height: 16px; background: #ff0066; border-radius: 50%; box-shadow: 0 0 15px #ff0066; animation: pulse 0.8s infinite;"></div>
                <span style="color: #ff0066; font-weight: 700; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">[PRIORITY ALPHA] CUSTOMER NEURAL LINK ESTABLISHED</span>
              </div>
              <div style="margin-top: 10px; margin-left: 31px; font-size: 12px; color: #00ffff; opacity: 0.7;">
                >>> DECRYPTION STATUS: COMPLETE | THREAT LEVEL: MINIMAL <<<
              </div>
            </div>
            
            <!-- Identity Profile -->
            <div style="background: linear-gradient(135deg, #0a0a0a 0%, #001122 100%); border: 1px solid #00ffff; padding: 25px; margin-bottom: 25px; position: relative; border-radius: 4px;">
              <div style="position: absolute; top: 0; right: 0; width: 0; height: 0; border-left: 25px solid transparent; border-right: 25px solid #00ffff; border-top: 25px solid #00ffff;"></div>
              <div style="position: absolute; top: 5px; right: 5px; width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid #000000; border-top: 15px solid #000000;"></div>
              
              <h3 style="color: #00ffff; margin: 0 0 20px 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 0 10px #00ffff;">〉〉 IDENTITY MATRIX</h3>
              
              <div style="margin-bottom: 20px; display: flex; align-items: center; gap: 20px;">
                <div style="width: 6px; height: 6px; background: #00ffff; transform: rotate(45deg); box-shadow: 0 0 8px #00ffff;"></div>
                <span style="color: #00ffff; font-weight: 700; min-width: 120px; font-size: 14px; letter-spacing: 1px;">DESIGNATION:</span>
                <span style="color: #ffffff; font-size: 18px; font-weight: 700; text-shadow: 0 0 5px #ffffff;">${name}</span>
              </div>
              
              <div style="margin-bottom: 0; display: flex; align-items: center; gap: 20px;">
                <div style="width: 6px; height: 6px; background: #00ffff; transform: rotate(45deg); box-shadow: 0 0 8px #00ffff;"></div>
                <span style="color: #00ffff; font-weight: 700; min-width: 120px; font-size: 14px; letter-spacing: 1px;">COMM CHANNEL:</span>
                <a href="mailto:${email}" style="color: #00ff00; text-decoration: none; font-size: 16px; text-shadow: 0 0 8px #00ff00; font-weight: 600;">${email}</a>
              </div>
            </div>
            
            <!-- Message Decode -->
            <div style="background: linear-gradient(135deg, #0a0a0a 0%, #001122 100%); border: 1px solid #ffff00; padding: 25px; margin-bottom: 25px; position: relative; border-radius: 4px;">
              <h3 style="color: #ffff00; margin: 0 0 20px 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 0 10px #ffff00;">〉〉 DECODED TRANSMISSION</h3>
              <div style="background: linear-gradient(135deg, #1a1a00 0%, #333300 100%); border-left: 4px solid #ffff00; padding: 25px; position: relative; border-radius: 4px;">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255, 255, 0, 0.03) 20px); pointer-events: none;"></div>
                <div style="margin-bottom: 10px; font-size: 12px; color: #ffff00; opacity: 0.7;">
                  >>> NEURAL PATTERN ANALYSIS: COMPLETE | AUTHENTICITY: VERIFIED <<<
                </div>
                <p style="color: #ffffff; margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap; position: relative; font-weight: 400;">${message}</p>
              </div>
            </div>
            
            <!-- Action Protocol -->
            <div style="background: linear-gradient(135deg, #001a00 0%, #003300 100%); border: 1px solid #00ff00; padding: 25px; text-align: center; position: relative; overflow: hidden; border-radius: 4px;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ff00, transparent); animation: scan 2.5s linear infinite;"></div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 15px; position: relative; margin-bottom: 10px;">
                <div style="width: 12px; height: 12px; background: #00ff00; border-radius: 50%; box-shadow: 0 0 15px #00ff00; animation: pulse 1.2s infinite;"></div>
                <span style="color: #00ff00; font-weight: 700; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">[CRITICAL] RESPONSE PROTOCOL INITIATED</span>
                <div style="width: 12px; height: 12px; background: #00ff00; border-radius: 50%; box-shadow: 0 0 15px #00ff00; animation: pulse 1.2s infinite;"></div>
              </div>
              <div style="font-size: 12px; color: #00ff00; opacity: 0.8; position: relative;">
                >>> MAXIMUM RESPONSE TIME: 24.00 HOURS | PRIORITY: ALPHA <<<
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #000000 0%, #001122 100%); padding: 20px; text-align: center; border-top: 2px solid #00ffff; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: glow 2s ease-in-out infinite;"></div>
            <p style="color: #00ffff; margin: 0; font-size: 12px; letter-spacing: 1px; opacity: 0.8;">
              >>> BUZZBANDITS NEURAL NETWORK | SECURE TRANSMISSION PROTOCOL v2.1 <<<
            </p>
            <p style="color: #00ffff; margin: 8px 0 0 0; font-size: 10px; opacity: 0.6;">
              TIMESTAMP: ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} | ZONE: NEURAL_STANDARD_TIME
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // User confirmation email - Futuristic customer-facing
    const userEmailSubject = "✨ Neural Link Confirmed - Your Message Has Been Received";
    const userEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Neural Link Confirmation</title>
        <style>
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
            50% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.6); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: radial-gradient(circle at center, #0a0a0a 0%, #000000 100%); color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #001122 100%); border: 2px solid #00ffff; border-radius: 12px; box-shadow: 0 0 40px rgba(0, 255, 255, 0.4), inset 0 0 40px rgba(0, 255, 255, 0.1); overflow: hidden; position: relative;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #001122 0%, #002244 100%); padding: 40px 20px; text-align: center; position: relative; border-bottom: 2px solid #00ffff;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: scan 2s linear infinite;"></div>
            <div style="animation: float 3s ease-in-out infinite;">
              <h1 style="color: #00ffff; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 0 20px #00ffff;">Neural Link Confirmed</h1>
              <p style="color: #ffffff; margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Welcome to the Network, ${name}</p>
            </div>
            <div style="margin-top: 20px; font-size: 14px; color: #00ffff; opacity: 0.7;">
              >>> CONNECTION ESTABLISHED | STATUS: SECURE <<<
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(45deg, transparent, transparent 48px, rgba(0, 255, 255, 0.02) 50px); pointer-events: none;"></div>
            
            <!-- Success Animation -->
            <div style="text-align: center; margin-bottom: 35px; position: relative;">
              <div style="background: linear-gradient(135deg, #001122 0%, #002244 100%); padding: 30px; border-radius: 20px; margin: 0 auto 25px auto; max-width: 320px; box-shadow: 0 0 30px rgba(0, 255, 255, 0.3); border: 2px solid #00ffff; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent); animation: scan 3s ease-in-out infinite;"></div>
                <div style="font-size: 64px; margin-bottom: 15px; animation: pulse 2s infinite; position: relative;">🌐</div>
                <div style="color: #00ffff; font-size: 20px; font-weight: 700; margin-bottom: 8px; position: relative;">TRANSMISSION RECEIVED</div>
                <div style="color: #ffffff; font-size: 16px; opacity: 0.8; position: relative;">Processing within 24 hours</div>
              </div>
              <p style="color: #ffffff; margin: 0; font-size: 16px; line-height: 1.6; opacity: 0.9;">
                Your message has been successfully transmitted through our neural network. Our advanced AI systems are processing your request and will respond within 24 hours.
              </p>
            </div>
            
            <!-- Data Package Summary -->
            <div style="background: linear-gradient(135deg, #0a0a0a 0%, #001122 100%); border: 2px solid #00ffff; border-radius: 12px; padding: 30px; margin-bottom: 30px; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; right: 0; width: 0; height: 0; border-left: 30px solid transparent; border-right: 30px solid #00ffff; border-top: 30px solid #00ffff;"></div>
              <div style="position: absolute; top: 5px; right: 5px; width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid #000000; border-top: 20px solid #000000;"></div>
              
              <h3 style="color: #00ffff; margin: 0 0 25px 0; font-size: 22px; text-align: center; text-shadow: 0 0 10px #00ffff;">📦 DATA PACKAGE SUMMARY</h3>
              
              <div style="border-bottom: 2px solid #00ffff; padding-bottom: 20px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                  <div style="width: 8px; height: 8px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff;"></div>
                  <span style="color: #00ffff; font-size: 14px; font-weight: 600;">SENDER IDENTITY:</span>
                </div>
                <span style="color: #ffffff; font-size: 18px; font-weight: 700; margin-left: 23px;">${name}</span>
              </div>
              
              <div style="border-bottom: 2px solid #00ffff; padding-bottom: 20px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                  <div style="width: 8px; height: 8px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff;"></div>
                  <span style="color: #00ffff; font-size: 14px; font-weight: 600;">COMM FREQUENCY:</span>
                </div>
                <span style="color: #00ff00; font-size: 16px; font-weight: 600; margin-left: 23px; text-shadow: 0 0 8px #00ff00;">${email}</span>
              </div>
              
              <div>
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                  <div style="width: 8px; height: 8px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff;"></div>
                  <span style="color: #00ffff; font-size: 14px; font-weight: 600;">NEURAL TRANSMISSION:</span>
                </div>
                <div style="background: linear-gradient(135deg, #001122 0%, #002244 100%); border-radius: 8px; padding: 20px; margin-left: 23px; border-left: 4px solid #00ffff; position: relative;">
                  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(0, 255, 255, 0.03) 20px); pointer-events: none;"></div>
                  <p style="color: #ffffff; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; position: relative;">${message}</p>
                </div>
              </div>
            </div>
            
            <!-- Response Timeline -->
            <div style="background: linear-gradient(135deg, #001a00 0%, #003300 100%); border: 2px solid #00ff00; border-radius: 12px; padding: 30px; color: #ffffff; text-align: center; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ff00, transparent); animation: scan 2s linear infinite;"></div>
              <h3 style="margin: 0 0 20px 0; font-size: 22px; color: #00ff00; text-shadow: 0 0 15px #00ff00; position: relative;">⚡ RESPONSE TIMELINE</h3>
              <div style="position: relative;">
                <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; opacity: 0.9;">
                  Our neural processing units typically respond to all transmissions within <strong style="color: #00ff00;">24 hours</strong> during standard operational cycles.
                </p>
                <p style="margin: 0; font-size: 14px; opacity: 0.7; color: #00ff00;">
                  For urgent matters requiring immediate neural intervention, please initiate direct quantum communication protocols.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #000000 0%, #001122 100%); padding: 25px; text-align: center; border-top: 2px solid #00ffff; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: glow 2s ease-in-out infinite;"></div>
            <p style="color: #00ffff; margin: 0 0 15px 0; font-size: 16px; opacity: 0.9;">
              Connected to the BUZZBANDITS Neural Network
            </p>
            <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 14px; opacity: 0.7;">
              Need immediate neural assistance? Don't hesitate to reconnect.
            </p>
            <p style="color: #00ffff; margin: 0; font-size: 12px; opacity: 0.6;">
              This is an automated neural response. Please do not reply to this transmission.
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

    return res.status(200).json({ 
      message: "Neural link established successfully! Messages transmitted to both networks.",
      status: "success",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Neural transmission failed:", error);
    return res.status(500).json({ 
      message: "Neural network disruption detected. Please retry transmission.",
      status: "error",
      timestamp: new Date().toISOString()
    });
  }
};


module.exports = {
    requestCallback,
    getInTouch
};
