const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { promisify } = require('util');
const axios = require('axios');


const execPromise = promisify(exec);
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
    // Team notification email - Internal cyberpunk style
    const teamEmailSubject = "🚀 NEW LEAD ALERT - Campaign Prospect Detected | BUZZBANDITS";
    const teamEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BUZZBANDITS - New Lead Alert</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%); color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); border: 2px solid #00ffff; border-radius: 12px; box-shadow: 0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); padding: 30px 20px; text-align: center; position: relative; border-bottom: 2px solid #00ffff;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: scan 2s linear infinite;"></div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 10px;">
              <div style="width: 8px; height: 8px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff; animation: pulse 1s infinite;"></div>
              <h1 style="color: #00ffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-shadow: 0 0 10px #00ffff;">BUZZBANDITS</h1>
              <div style="width: 8px; height: 8px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff; animation: pulse 1s infinite;"></div>
            </div>
            <p style="color: #00ffff; margin: 0; font-size: 14px; letter-spacing: 1px; opacity: 0.8;">DIGITAL MARKETING COMMAND CENTER</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 20px; background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%); position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(90deg, transparent, transparent 98px, rgba(0, 255, 255, 0.03) 100px); pointer-events: none;"></div>
            
            <!-- Status Alert -->
            <div style="background: linear-gradient(135deg, #001a1a 0%, #003333 100%); border: 1px solid #00ffff; border-radius: 8px; padding: 20px; margin-bottom: 25px; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent); animation: sweep 3s ease-in-out infinite;"></div>
              <div style="display: flex; align-items: center; gap: 15px; position: relative;">
                <div style="width: 16px; height: 16px; background: #00ff00; border-radius: 50%; box-shadow: 0 0 15px #00ff00; animation: pulse 1s infinite;"></div>
                <div>
                  <div style="color: #00ff00; font-weight: 600; font-size: 16px; letter-spacing: 1px; margin-bottom: 5px;">NEW CALLBACK REQUEST</div>
                  <div style="color: #ffffff; font-size: 14px; opacity: 0.9;">High-value prospect ready for engagement</div>
                </div>
              </div>
            </div>
            
            <!-- Prospect Data -->
            <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); border: 1px solid #00ffff; border-radius: 8px; padding: 25px; margin-bottom: 25px; position: relative;">
              <div style="position: absolute; top: 0; right: 0; width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid #00ffff; border-top: 20px solid #00ffff;"></div>
              <h3 style="color: #00ffff; margin: 0 0 20px 0; font-size: 18px; letter-spacing: 1px; text-transform: uppercase;">⚡ PROSPECT PROFILE</h3>
              
              <div style="margin-bottom: 15px; padding: 12px; background: rgba(0, 255, 255, 0.05); border-radius: 6px; border-left: 4px solid #00ffff;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                  <span style="color: #00ffff; font-weight: 600; font-size: 14px;">👤 CONTACT NAME:</span>
                </div>
                <span style="color: #ffffff; font-size: 18px; font-weight: 600; margin-left: 25px;">${fullName}</span>
              </div>
              
              <div style="margin-bottom: 15px; padding: 12px; background: rgba(0, 255, 255, 0.05); border-radius: 6px; border-left: 4px solid #00ff00;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                  <span style="color: #00ffff; font-weight: 600; font-size: 14px;">📧 EMAIL ADDRESS:</span>
                </div>
                <a href="mailto:${email}" style="color: #00ff00; text-decoration: none; font-size: 16px; text-shadow: 0 0 5px #00ff00; margin-left: 25px; font-weight: 500;">${email}</a>
              </div>
              
              <div style="margin-bottom: 0; padding: 12px; background: rgba(0, 255, 255, 0.05); border-radius: 6px; border-left: 4px solid #ff6b35;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                  <span style="color: #00ffff; font-weight: 600; font-size: 14px;">📞 PHONE NUMBER:</span>
                </div>
                <a href="tel:${phone}" style="color: #ff6b35; text-decoration: none; font-size: 16px; text-shadow: 0 0 5px #ff6b35; margin-left: 25px; font-weight: 500;">${phone}</a>
              </div>
            </div>
            
            <!-- Action Required -->
            <div style="background: linear-gradient(135deg, #1a0000 0%, #330000 100%); border: 1px solid #ff0040; border-radius: 8px; padding: 25px; text-align: center; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #ff0040, transparent); animation: scan 1.5s linear infinite;"></div>
              <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
                <div style="width: 10px; height: 10px; background: #ff0040; border-radius: 50%; box-shadow: 0 0 15px #ff0040; animation: pulse 0.5s infinite;"></div>
                <span style="color: #ff0040; font-weight: 600; font-size: 16px; letter-spacing: 1px;">PRIORITY ACTION REQUIRED</span>
                <div style="width: 10px; height: 10px; background: #ff0040; border-radius: 50%; box-shadow: 0 0 15px #ff0040; animation: pulse 0.5s infinite;"></div>
              </div>
              <p style="color: #ffffff; margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.9;">
                <strong>Initiate contact within 24 hours</strong><br>
                Schedule callback during business hours (9 AM - 6 PM)<br>
                Prepare digital marketing consultation materials
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); padding: 20px; text-align: center; border-top: 1px solid #00ffff; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #00ffff, transparent);"></div>
            <p style="color: #00ffff; margin: 0; font-size: 12px; letter-spacing: 1px; opacity: 0.7;">
              GENERATED: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} | SYSTEM STATUS: OPERATIONAL
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

    // User confirmation email - Elegant cyberpunk customer-facing
    const userEmailSubject = "🚀 Callback Confirmed - Your Digital Growth Journey Begins | BUZZBANDITS";
    const userEmailBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BUZZBANDITS - Callback Confirmed</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%); color: #ffffff;">
        <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); border: 2px solid #00ffff; border-radius: 12px; box-shadow: 0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); padding: 40px 20px; text-align: center; position: relative; border-bottom: 2px solid #00ffff;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: scan 2s linear infinite;"></div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
              <div style="width: 10px; height: 10px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 15px #00ffff; animation: pulse 1s infinite;"></div>
              <h1 style="color: #00ffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 3px; text-shadow: 0 0 15px #00ffff;">BUZZBANDITS</h1>
              <div style="width: 10px; height: 10px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 15px #00ffff; animation: pulse 1s infinite;"></div>
            </div>
            <h2 style="color: #00ff00; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 2px; text-shadow: 0 0 10px #00ff00;">WELCOME, ${fullName.toUpperCase()}</h2>
            <p style="color: #00ffff; margin: 10px 0 0 0; font-size: 16px; letter-spacing: 1px; opacity: 0.8;">Your Digital Marketing Transformation Awaits</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px; background: linear-gradient(135deg, #000000 0%, #0a0a0a 100%); position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(90deg, transparent, transparent 98px, rgba(0, 255, 255, 0.03) 100px); pointer-events: none;"></div>
            
            <!-- Success Status -->
            <div style="text-align: center; margin-bottom: 35px; position: relative;">
              <div style="background: linear-gradient(135deg, #001a1a 0%, #003333 100%); border: 2px solid #00ffff; border-radius: 12px; padding: 35px; margin: 0 auto 25px auto; max-width: 380px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent); animation: sweep 3s ease-in-out infinite;"></div>
                <div style="font-size: 64px; margin-bottom: 20px; position: relative;">🚀</div>
                <div style="color: #00ff00; font-size: 22px; font-weight: 600; margin-bottom: 10px; letter-spacing: 1px; text-shadow: 0 0 10px #00ff00; position: relative;">CALLBACK CONFIRMED</div>
                <div style="color: #00ffff; font-size: 16px; letter-spacing: 1px; opacity: 0.9; position: relative;">Ready to accelerate your growth</div>
              </div>
              <p style="color: #ffffff; margin: 0; font-size: 18px; line-height: 1.6; opacity: 0.9;">
                Thank you for choosing BUZZBANDITS! Your callback request has been successfully processed. 
                Our digital marketing experts will contact you within 24 hours to discuss your growth opportunities.
              </p>
            </div>
            
            <!-- Request Details -->
            <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); border: 1px solid #00ffff; border-radius: 12px; padding: 30px; margin-bottom: 30px; position: relative;">
              <div style="position: absolute; top: 0; right: 0; width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid #00ffff; border-top: 20px solid #00ffff;"></div>
              <h3 style="color: #00ffff; margin: 0 0 25px 0; font-size: 20px; letter-spacing: 1px; text-transform: uppercase;">📋 YOUR CALLBACK DETAILS</h3>
              
              <div style="border-bottom: 1px solid rgba(0, 255, 255, 0.2); padding-bottom: 20px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <div style="width: 6px; height: 6px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff;"></div>
                  <span style="color: #00ffff; font-size: 16px; letter-spacing: 1px; font-weight: 500;">PRIMARY CONTACT NUMBER</span>
                </div>
                <span style="color: #00ff00; font-size: 20px; font-weight: 600; margin-left: 25px; text-shadow: 0 0 5px #00ff00;">${phone}</span>
              </div>
              
              <div>
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <div style="width: 6px; height: 6px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff;"></div>
                  <span style="color: #00ffff; font-size: 16px; letter-spacing: 1px; font-weight: 500;">BACKUP EMAIL ADDRESS</span>
                </div>
                <span style="color: #00ff00; font-size: 20px; font-weight: 600; margin-left: 25px; text-shadow: 0 0 5px #00ff00;">${email}</span>
              </div>
            </div>
            
            <!-- What to Expect -->
            <div style="background: linear-gradient(135deg, #1a0040 0%, #330080 100%); border: 1px solid #8000ff; border-radius: 12px; padding: 30px; color: #ffffff; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #8000ff, transparent); animation: scan 2s linear infinite;"></div>
              <h3 style="margin: 0 0 20px 0; font-size: 20px; color: #8000ff; letter-spacing: 1px; text-shadow: 0 0 10px #8000ff; position: relative;">🎯 WHAT HAPPENS NEXT</h3>
              
              <div style="position: relative;">
                <div style="margin-bottom: 15px; display: flex; align-items: start; gap: 15px;">
                  <div style="width: 8px; height: 8px; background: #8000ff; border-radius: 50%; margin-top: 6px; box-shadow: 0 0 10px #8000ff;"></div>
                  <div>
                    <div style="font-weight: 600; margin-bottom: 5px; color: #ffffff;">Expert Consultation</div>
                    <div style="font-size: 14px; opacity: 0.9; line-height: 1.5;">Our digital marketing specialist will call you to understand your business goals and challenges</div>
                  </div>
                </div>
                
                <div style="margin-bottom: 15px; display: flex; align-items: start; gap: 15px;">
                  <div style="width: 8px; height: 8px; background: #8000ff; border-radius: 50%; margin-top: 6px; box-shadow: 0 0 10px #8000ff;"></div>
                  <div>
                    <div style="font-weight: 600; margin-bottom: 5px; color: #ffffff;">Custom Strategy Development</div>
                    <div style="font-size: 14px; opacity: 0.9; line-height: 1.5;">We'll design a tailored digital marketing strategy to maximize your ROI and growth</div>
                  </div>
                </div>
                
                <div style="margin-bottom: 0; display: flex; align-items: start; gap: 15px;">
                  <div style="width: 8px; height: 8px; background: #8000ff; border-radius: 50%; margin-top: 6px; box-shadow: 0 0 10px #8000ff;"></div>
                  <div>
                    <div style="font-weight: 600; margin-bottom: 5px; color: #ffffff;">Results-Driven Execution</div>
                    <div style="font-size: 14px; opacity: 0.9; line-height: 1.5;">Launch campaigns designed to drive traffic, leads, and conversions for your business</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); padding: 30px; text-align: center; border-top: 1px solid #00ffff; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #00ffff, transparent);"></div>
            <p style="color: #00ffff; margin: 0 0 15px 0; font-size: 16px; letter-spacing: 1px; opacity: 0.8;">
              Questions? Contact us at <a href="mailto:admin@buzzbandits.net" style="color: #00ff00; text-decoration: none; text-shadow: 0 0 5px #00ff00;">admin@buzzbandits.net</a>
            </p>
            <p style="color: #666666; margin: 0; font-size: 12px; letter-spacing: 1px; opacity: 0.6;">
              This is an automated confirmation. Please do not reply to this email.
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
// Team notification email - Internal cyberpunk style
const teamEmailSubject = "🚀 NEW DIGITAL LEAD ACQUIRED - Client Engagement Protocol Initiated";
const teamEmailBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BUZZBANDITS - Digital Command Center</title>
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
      @keyframes dataStream {
        0% { opacity: 0.1; }
        50% { opacity: 0.3; }
        100% { opacity: 0.1; }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: radial-gradient(circle at center, #0a0a0a 0%, #000000 100%); color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #001122 100%); border: 2px solid #00ffff; border-radius: 12px; box-shadow: 0 0 40px rgba(0, 255, 255, 0.4), inset 0 0 40px rgba(0, 255, 255, 0.1); overflow: hidden; position: relative;">
      
      <!-- Data Stream Background -->
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px); animation: dataStream 3s linear infinite; pointer-events: none;"></div>
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #001122 0%, #002244 100%); padding: 30px 20px; text-align: center; position: relative; border-bottom: 2px solid #00ffff;">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: scan 2s linear infinite;"></div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
          <div style="width: 10px; height: 10px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 15px #00ffff; animation: pulse 1s infinite;"></div>
          <h1 style="color: #00ffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 2px; text-shadow: 0 0 15px #00ffff;">BUZZBANDITS</h1>
          <div style="width: 10px; height: 10px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 15px #00ffff; animation: pulse 1s infinite;"></div>
        </div>
        <p style="color: #00ffff; margin: 0; font-size: 14px; letter-spacing: 1px; opacity: 0.8;">DIGITAL MARKETING COMMAND CENTER</p>
        <div style="margin-top: 15px; font-size: 12px; color: #00ffff; opacity: 0.6;">
          >>> NEW CLIENT ACQUISITION DETECTED <<<
        </div>
      </div>
      
      <!-- Content -->
      <div style="padding: 30px 20px; position: relative;">
        
        <!-- Alert Banner -->
        <div style="background: linear-gradient(135deg, #001122 0%, #002244 100%); border: 1px solid #00ffff; padding: 20px; margin-bottom: 25px; position: relative; overflow: hidden; border-radius: 8px;">
          <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent); animation: scan 3s ease-in-out infinite;"></div>
          <div style="display: flex; align-items: center; gap: 15px; position: relative;">
            <div style="width: 16px; height: 16px; background: #ff6b35; border-radius: 50%; box-shadow: 0 0 15px #ff6b35; animation: pulse 0.8s infinite;"></div>
            <span style="color: #ff6b35; font-weight: 700; font-size: 16px; letter-spacing: 1px;">🎯 HIGH-PRIORITY LEAD CAPTURED</span>
          </div>
          <div style="margin-top: 10px; margin-left: 31px; font-size: 12px; color: #00ffff; opacity: 0.8;">
            >>> CLIENT ENGAGEMENT PROTOCOL INITIATED | RESPONSE TIME: 24 HOURS <<<
          </div>
        </div>
        
        <!-- Client Profile -->
        <div style="background: linear-gradient(135deg, #0a0a0a 0%, #001122 100%); border: 1px solid #00ffff; padding: 25px; margin-bottom: 25px; position: relative; border-radius: 8px;">
          <div style="position: absolute; top: 0; right: 0; width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid #00ffff; border-top: 20px solid #00ffff;"></div>
          <div style="position: absolute; top: 3px; right: 3px; width: 0; height: 0; border-left: 14px solid transparent; border-right: 14px solid #000000; border-top: 14px solid #000000;"></div>
          
          <h3 style="color: #00ffff; margin: 0 0 20px 0; font-size: 18px; letter-spacing: 1px; text-transform: uppercase; text-shadow: 0 0 8px #00ffff;">📊 CLIENT PROFILE</h3>
          
          <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 15px;">
            <div style="width: 6px; height: 6px; background: #00ffff; transform: rotate(45deg); box-shadow: 0 0 8px #00ffff;"></div>
            <span style="color: #00ffff; font-weight: 600; min-width: 100px; font-size: 14px;">CONTACT:</span>
            <span style="color: #ffffff; font-size: 16px; font-weight: 600;">${name}</span>
          </div>
          
          <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 15px;">
            <div style="width: 6px; height: 6px; background: #00ffff; transform: rotate(45deg); box-shadow: 0 0 8px #00ffff;"></div>
            <span style="color: #00ffff; font-weight: 600; min-width: 100px; font-size: 14px;">EMAIL:</span>
            <a href="mailto:${email}" style="color: #00ff00; text-decoration: none; font-size: 14px; text-shadow: 0 0 8px #00ff00; font-weight: 500;">${email}</a>
          </div>
          
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="width: 6px; height: 6px; background: #00ffff; transform: rotate(45deg); box-shadow: 0 0 8px #00ffff;"></div>
            <span style="color: #00ffff; font-weight: 600; min-width: 100px; font-size: 14px;">TIMESTAMP:</span>
            <span style="color: #ffffff; font-size: 14px;">${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        <!-- Message Content -->
        <div style="background: linear-gradient(135deg, #0a0a0a 0%, #001122 100%); border: 1px solid #ffaa00; padding: 25px; margin-bottom: 25px; position: relative; border-radius: 8px;">
          <h3 style="color: #ffaa00; margin: 0 0 15px 0; font-size: 18px; letter-spacing: 1px; text-transform: uppercase; text-shadow: 0 0 8px #ffaa00;">💬 CLIENT MESSAGE</h3>
          <div style="background: linear-gradient(135deg, #1a1600 0%, #332c00 100%); border-left: 4px solid #ffaa00; padding: 20px; position: relative; border-radius: 6px;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255, 170, 0, 0.03) 20px); pointer-events: none;"></div>
            <p style="color: #ffffff; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; position: relative;">${message}</p>
          </div>
        </div>
        
        <!-- Action Items -->
        <div style="background: linear-gradient(135deg, #001a00 0%, #003300 100%); border: 1px solid #00ff00; padding: 25px; text-align: center; position: relative; overflow: hidden; border-radius: 8px;">
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ff00, transparent); animation: scan 2.5s linear infinite;"></div>
          <h3 style="color: #00ff00; margin: 0 0 15px 0; font-size: 18px; letter-spacing: 1px; text-transform: uppercase; text-shadow: 0 0 10px #00ff00; position: relative;">⚡ ACTION REQUIRED</h3>
          <div style="position: relative;">
            <p style="margin: 0 0 10px 0; font-size: 15px; color: #ffffff; opacity: 0.9;">
              <strong style="color: #00ff00;">PRIORITY:</strong> Respond within 24 hours to maintain optimal conversion rates
            </p>
            <p style="margin: 0; font-size: 13px; color: #00ff00; opacity: 0.8;">
              📋 Review client requirements | 📞 Schedule consultation call | 📈 Prepare marketing strategy proposal
            </p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #000000 0%, #001122 100%); padding: 20px; text-align: center; border-top: 2px solid #00ffff; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: glow 2s ease-in-out infinite;"></div>
        <p style="color: #00ffff; margin: 0 0 5px 0; font-size: 12px; letter-spacing: 1px; opacity: 0.8;">
          BUZZBANDITS DIGITAL MARKETING COMMAND CENTER
        </p>
        <p style="color: #ffffff; margin: 0; font-size: 10px; opacity: 0.6;">
          Automated Lead Management System v3.0 | ${new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  </body>
  </html>
`;

// User confirmation email - Clean, professional cyberpunk style
const userEmailSubject = "🌟 Your Digital Marketing Inquiry Has Been Received - BUZZBANDITS";
const userEmailBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Received - BUZZBANDITS</title>
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
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
        50% { transform: translateY(-8px); }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: radial-gradient(circle at center, #0a0a0a 0%, #000000 100%); color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #001122 100%); border: 2px solid #00ffff; border-radius: 16px; box-shadow: 0 0 40px rgba(0, 255, 255, 0.4), inset 0 0 40px rgba(0, 255, 255, 0.1); overflow: hidden; position: relative;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #001122 0%, #002244 100%); padding: 40px 30px; text-align: center; position: relative; border-bottom: 2px solid #00ffff;">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: scan 2s linear infinite;"></div>
        <div style="animation: float 3s ease-in-out infinite;">
          <h1 style="color: #00ffff; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 0 20px #00ffff; letter-spacing: 1px;">BUZZBANDITS</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Digital Marketing Specialists</p>
        </div>
        <div style="margin-top: 20px; font-size: 14px; color: #00ffff; opacity: 0.7;">
          Message Successfully Received
        </div>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 30px; position: relative;">
        
        <!-- Welcome Message -->
        <div style="text-align: center; margin-bottom: 35px; position: relative;">
          <div style="background: linear-gradient(135deg, #001122 0%, #002244 100%); padding: 30px; border-radius: 20px; margin: 0 auto 25px auto; max-width: 350px; box-shadow: 0 0 30px rgba(0, 255, 255, 0.2); border: 2px solid #00ffff; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.15), transparent); animation: scan 4s ease-in-out infinite;"></div>
            <div style="font-size: 48px; margin-bottom: 15px; animation: pulse 2s infinite; position: relative;">🚀</div>
            <div style="color: #00ffff; font-size: 18px; font-weight: 600; margin-bottom: 8px; position: relative;">MESSAGE RECEIVED</div>
            <div style="color: #ffffff; font-size: 14px; opacity: 0.8; position: relative;">We'll respond within 24 hours</div>
          </div>
          
          <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 24px; font-weight: 600;">Hello ${name}! 👋</h2>
          <p style="color: #ffffff; margin: 0; font-size: 16px; line-height: 1.6; opacity: 0.9;">
            Thank you for reaching out to BUZZBANDITS! We've received your message and our digital marketing experts are reviewing your requirements.
          </p>
        </div>
        
        <!-- Message Summary -->
        <div style="background: linear-gradient(135deg, #0a0a0a 0%, #001122 100%); border: 2px solid #00ffff; border-radius: 12px; padding: 25px; margin-bottom: 30px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; right: 0; width: 0; height: 0; border-left: 25px solid transparent; border-right: 25px solid #00ffff; border-top: 25px solid #00ffff;"></div>
          <div style="position: absolute; top: 4px; right: 4px; width: 0; height: 0; border-left: 17px solid transparent; border-right: 17px solid #000000; border-top: 17px solid #000000;"></div>
          
          <h3 style="color: #00ffff; margin: 0 0 20px 0; font-size: 18px; text-align: center; text-shadow: 0 0 10px #00ffff;">📋 Your Message Summary</h3>
          
          <div style="border-bottom: 1px solid #00ffff; padding-bottom: 15px; margin-bottom: 15px; opacity: 0.8;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <div style="width: 6px; height: 6px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 8px #00ffff;"></div>
              <span style="color: #00ffff; font-size: 14px; font-weight: 600;">Name:</span>
            </div>
            <span style="color: #ffffff; font-size: 16px; font-weight: 500; margin-left: 18px;">${name}</span>
          </div>
          
          <div style="border-bottom: 1px solid #00ffff; padding-bottom: 15px; margin-bottom: 15px; opacity: 0.8;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <div style="width: 6px; height: 6px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 8px #00ffff;"></div>
              <span style="color: #00ffff; font-size: 14px; font-weight: 600;">Email:</span>
            </div>
            <span style="color: #00ff00; font-size: 14px; font-weight: 500; margin-left: 18px; text-shadow: 0 0 8px #00ff00;">${email}</span>
          </div>
          
          <div>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div style="width: 6px; height: 6px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 8px #00ffff;"></div>
              <span style="color: #00ffff; font-size: 14px; font-weight: 600;">Your Message:</span>
            </div>
            <div style="background: linear-gradient(135deg, #001122 0%, #002244 100%); border-radius: 8px; padding: 18px; margin-left: 18px; border-left: 3px solid #00ffff; position: relative;">
              <p style="color: #ffffff; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; position: relative;">${message}</p>
            </div>
          </div>
        </div>
        
        <!-- Next Steps -->
        <div style="background: linear-gradient(135deg, #001a00 0%, #003300 100%); border: 2px solid #00ff00; border-radius: 12px; padding: 25px; color: #ffffff; text-align: center; position: relative; overflow: hidden; margin-bottom: 25px;">
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ff00, transparent); animation: scan 2s linear infinite;"></div>
          <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #00ff00; text-shadow: 0 0 15px #00ff00; position: relative;">🎯 What Happens Next?</h3>
          <div style="position: relative;">
            <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.6; opacity: 0.9;">
              Our digital marketing specialists will review your requirements and get back to you within <strong style="color: #00ff00;">24 hours</strong> with a customized strategy proposal.
            </p>
            <p style="margin: 0; font-size: 13px; opacity: 0.8; color: #00ff00;">
              📈 Strategy Development | 💡 Creative Solutions | 🎯 Growth Optimization
            </p>
          </div>
        </div>
        
        <!-- Contact Info -->
        <div style="background: linear-gradient(135deg, #0a0a0a 0%, #001122 100%); border: 1px solid #00ffff; border-radius: 8px; padding: 20px; text-align: center;">
          <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">
            <strong>Need immediate assistance?</strong>
          </p>
          <p style="color: #00ffff; margin: 0; font-size: 13px; opacity: 0.8;">
            Feel free to reach out to us directly for urgent matters
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #000000 0%, #001122 100%); padding: 25px; text-align: center; border-top: 2px solid #00ffff; position: relative;">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #00ffff, transparent); animation: glow 2s ease-in-out infinite;"></div>
        <p style="color: #00ffff; margin: 0 0 10px 0; font-size: 16px; opacity: 0.9; font-weight: 600;">
          BUZZBANDITS
        </p>
        <p style="color: #ffffff; margin: 0 0 8px 0; font-size: 13px; opacity: 0.8;">
          Elevating Your Digital Presence
        </p>
        <p style="color: #00ffff; margin: 0; font-size: 11px; opacity: 0.6;">
          This is an automated response. Please do not reply to this email.
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



const generateWebsiteReport = async (req, res) => {
  try {
    const { websiteUrl, email } = req.body;

    if (!websiteUrl || !email) {
      return res.status(400).json({ error: 'Missing websiteUrl or email' });
    }

    const apiKey = process.env.PAGESPEED_API_KEY;
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(websiteUrl)}&key=${apiKey}&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY&category=BEST_PRACTICES`;

    // Fetch PageSpeed Insights data
    const { data } = await axios.get(apiUrl);
    const lighthouseResult = data.lighthouseResult;

    // Process and analyze data
    const reportData = processLighthouseData(lighthouseResult, websiteUrl);
    
    // Generate email content
    const userEmailSubject = `🚀 Your Website Performance Report for ${websiteUrl} - BuzzBandits Analysis`;
    const userEmailBody = generateUserEmailHTML(reportData, websiteUrl);

    const teamEmailSubject = `New Website Audit Lead - ${reportData.summary.overallScore}/100 Score`;
    const teamEmailBody = generateTeamEmailHTML(reportData, websiteUrl, email);

    // Send emails (no attachments needed)
    await Promise.all([
      sendEmail(teamEmailSubject, teamEmailBody, null, []), // Send to team
      sendEmail(userEmailSubject, userEmailBody, email, []), // Send to user
    ]);

    // Return the beautiful formatted data
    return res.status(200).json({
      success: true,
      message: 'Website analysis completed and report sent successfully!',
      analyzedAt: new Date().toISOString()
    });

  } catch (err) {
    console.error('Error generating report:', err);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to analyze website', 
      details: err.message 
    });
  }
};

// Enhanced helper function to process Lighthouse data
const processLighthouseData = (lighthouseResult, websiteUrl) => {
  const categories = lighthouseResult.categories;
  const audits = lighthouseResult.audits;
  
  // Calculate scores
  const scores = {
    performance: Math.round(categories.performance.score * 100),
    seo: Math.round(categories.seo.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    bestPractices: Math.round(categories['best-practices'].score * 100)
  };

  const overallScore = Math.round((scores.performance + scores.seo + scores.accessibility + scores.bestPractices) / 4);

  // Core Web Vitals with detailed info
  const coreWebVitals = {
    firstContentfulPaint: {
      value: audits['first-contentful-paint']?.numericValue || 0,
      displayValue: audits['first-contentful-paint']?.displayValue || 'N/A',
      score: audits['first-contentful-paint']?.score || 0,
      status: getMetricStatus(audits['first-contentful-paint']?.score || 0)
    },
    largestContentfulPaint: {
      value: audits['largest-contentful-paint']?.numericValue || 0,
      displayValue: audits['largest-contentful-paint']?.displayValue || 'N/A',
      score: audits['largest-contentful-paint']?.score || 0,
      status: getMetricStatus(audits['largest-contentful-paint']?.score || 0)
    },
    cumulativeLayoutShift: {
      value: audits['cumulative-layout-shift']?.numericValue || 0,
      displayValue: audits['cumulative-layout-shift']?.displayValue || 'N/A',
      score: audits['cumulative-layout-shift']?.score || 0,
      status: getMetricStatus(audits['cumulative-layout-shift']?.score || 0)
    },
    totalBlockingTime: {
      value: audits['total-blocking-time']?.numericValue || 0,
      displayValue: audits['total-blocking-time']?.displayValue || 'N/A',
      score: audits['total-blocking-time']?.score || 0,
      status: getMetricStatus(audits['total-blocking-time']?.score || 0)
    }
  };

  // Identify critical issues with more details
  const criticalIssues = [];
  const opportunities = [];
  const passedAudits = [];

  Object.entries(audits).forEach(([key, audit]) => {
    if (audit.score !== null && audit.title) {
      const auditData = {
        id: key,
        title: audit.title,
        description: audit.description,
        score: Math.round(audit.score * 100),
        scoreDisplayMode: audit.scoreDisplayMode,
        displayValue: audit.displayValue || null,
        details: audit.details || null
      };

      if (audit.score < 0.5) {
        criticalIssues.push({
          ...auditData,
          impact: audit.details?.overallSavingsMs || 0,
          severity: audit.score < 0.3 ? 'high' : 'medium'
        });
      } else if (audit.score === 1) {
        passedAudits.push(auditData);
      }
      
      if (audit.details?.overallSavingsMs > 500) {
        opportunities.push({
          ...auditData,
          savings: audit.details.overallSavingsMs,
          savingsDisplayValue: formatTime(audit.details.overallSavingsMs),
          type: 'performance'
        });
      }
    }
  });

  // Generate specific recommendations based on scores
  const recommendations = [];
  
  if (scores.performance < 70) {
    recommendations.push({
      category: 'Performance',
      title: 'Optimize images and enable compression',
      priority: 'high',
      description: 'Compress images and enable text compression to reduce load times.',
      impact: 'Can improve load time by 20-40%',
      actionItems: [
        'Compress images using WebP format',
        'Enable gzip/brotli compression',
        'Minify CSS and JavaScript files'
      ]
    });
  }

  if (scores.seo < 80) {
    recommendations.push({
      category: 'SEO',
      title: 'Improve meta descriptions and title tags',
      priority: 'medium',
      description: 'Ensure all pages have unique, descriptive meta tags.',
      impact: 'Better search engine visibility',
      actionItems: [
        'Add unique meta descriptions to all pages',
        'Optimize title tags for target keywords',
        'Improve heading structure (H1, H2, H3)'
      ]
    });
  }

  if (scores.accessibility < 80) {
    recommendations.push({
      category: 'Accessibility',
      title: 'Add alt text to images and improve color contrast',
      priority: 'high',
      description: 'Make your website accessible to all users.',
      impact: 'Improves usability for disabled users',
      actionItems: [
        'Add alt text to all images',
        'Ensure proper color contrast ratios',
        'Add ARIA labels where needed'
      ]
    });
  }

  if (scores.bestPractices < 80) {
    recommendations.push({
      category: 'Best Practices',
      title: 'Update to modern web standards',
      priority: 'medium',
      description: 'Follow current web development best practices.',
      impact: 'Better security and performance',
      actionItems: [
        'Use HTTPS everywhere',
        'Update to modern JavaScript features',
        'Remove deprecated APIs'
      ]
    });
  }

  return {
    url: websiteUrl,
    summary: {
      overallScore,
      grades: {
        performance: { score: scores.performance, status: getScoreStatus(scores.performance) },
        seo: { score: scores.seo, status: getScoreStatus(scores.seo) },
        accessibility: { score: scores.accessibility, status: getScoreStatus(scores.accessibility) },
        bestPractices: { score: scores.bestPractices, status: getScoreStatus(scores.bestPractices) }
      }
    },
    coreWebVitals,
    issues: {
      critical: criticalIssues,
      total: criticalIssues.length
    },
    opportunities: {
      items: opportunities,
      total: opportunities.length,
      totalSavings: opportunities.reduce((sum, opp) => sum + opp.savings, 0)
    },
    recommendations: {
      items: recommendations,
      total: recommendations.length,
      highPriority: recommendations.filter(r => r.priority === 'high').length
    },
    passed: {
      audits: passedAudits,
      total: passedAudits.length
    },
    metadata: {
      lighthouseVersion: lighthouseResult.lighthouseVersion,
      fetchTime: lighthouseResult.fetchTime,
      userAgent: lighthouseResult.userAgent,
      environment: lighthouseResult.environment
    }
  };
};

// Helper function to get score status
const getScoreStatus = (score) => {
  if (score >= 90) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'needs-improvement';
  return 'poor';
};

// Helper function to get metric status
const getMetricStatus = (score) => {
  if (score >= 0.9) return 'good';
  if (score >= 0.5) return 'needs-improvement';
  return 'poor';
};

// Helper function to format time
const formatTime = (ms) => {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
};

// Helper function to get score color for emails
const getScoreColor = (score) => {
  if (score >= 90) return '#0CCE6B';
  if (score >= 70) return '#FFA500';
  if (score >= 50) return '#FF6B35';
  return '#FF4458';
};

// Generate beautiful HTML email for user
const generateUserEmailHTML = (reportData, websiteUrl) => {
  const { summary, issues, recommendations } = reportData;
  
  // Categorize issues into broad areas
  const issueCategories = {
    performance: "Site Speed & Loading",
    seo: "Search Engine Optimization", 
    accessibility: "User Experience & Accessibility",
    security: "Security & Trust Signals",
    mobile: "Mobile Responsiveness"
  };
  
  // Get top 3 issue categories (you can customize this logic based on your data structure)
  const topIssues = Object.values(issueCategories).slice(0, 3);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Analysis Complete</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);">
  <div style="max-width: 600px; margin: 0 auto; background: rgba(255, 255, 255, 0.03); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(0, 255, 255, 0.2);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #000000 0%, #1a1a2e 100%); padding: 30px 20px; text-align: center; position: relative; border-bottom: 2px solid #00ffff;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00ffff, transparent);"></div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 10px;">
        <div style="width: 8px; height: 8px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff; animation: pulse 2s infinite;"></div>
        <h1 style="color: #00ffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 2px; text-shadow: 0 0 10px #00ffff;">BUZZBANDITS</h1>
        <div style="width: 8px; height: 8px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff; animation: pulse 2s infinite;"></div>
      </div>
      <p style="color: #00ffff; margin: 0 0 15px 0; font-size: 14px; letter-spacing: 1px; opacity: 0.8;">DIGITAL OPTIMIZATION </p>
      <div style="background: rgba(0, 255, 255, 0.1); padding: 12px; border-radius: 8px; border: 1px solid rgba(0, 255, 255, 0.3);">
        <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 500;">⚡ ANALYSIS COMPLETE</p>
        <p style="margin: 5px 0 0 0; font-size: 14px; color: #00ffff; opacity: 0.9;">${websiteUrl}</p>
      </div>
    </div>

    <!-- Issues Section -->
    <div style="padding: 30px 25px; background: rgba(0, 0, 0, 0.4); border-bottom: 1px solid rgba(0, 255, 255, 0.1);">
      <h2 style="margin: 0 0 20px 0; color: #00ffff; font-size: 20px; font-weight: 600; text-align: center; letter-spacing: 1px;">OPTIMIZATION TARGETS IDENTIFIED</h2>
      
      <div style="display: grid; gap: 12px;">
        ${topIssues.map(issue => `
          <div style="background: rgba(255, 255, 255, 0.05); padding: 16px; border-radius: 8px; border-left: 4px solid #ffc107; backdrop-filter: blur(5px);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 6px; height: 6px; background: #ffc107; border-radius: 50%; box-shadow: 0 0 8px #ffc107;"></div>
              <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 500;">${issue}</p>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div style="background: rgba(220, 53, 69, 0.1); padding: 16px; border-radius: 8px; margin-top: 20px; border: 1px solid rgba(220, 53, 69, 0.3);">
        <p style="margin: 0; color: #ff6b6b; font-size: 14px; text-align: center; font-weight: 500;">
          ${issues.total} critical optimization opportunities detected
        </p>
      </div>
    </div>

    <!-- CTA Section -->
    <div style="padding: 30px 25px; background: rgba(0, 0, 0, 0.6); text-align: center;">
      <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #ffffff; font-weight: 600;">READY TO OPTIMIZE?</h3>
      <p style="margin: 0 0 25px 0; font-size: 14px; color: #cbd5e1; line-height: 1.5;">
        Let's transform these issues into competitive advantages.
      </p>
      
      <a href="https://buzzbandits.net?utm_source=audit_email&utm_medium=email&utm_campaign=website_audit" 
         style="display: inline-block; background: linear-gradient(135deg, #00ffff 0%, #0099cc 100%); color: #000000; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px; margin: 10px 0; box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); text-transform: uppercase; letter-spacing: 1px;">
        ⚡ INITIATE OPTIMIZATION
      </a>
      
      <p style="margin: 15px 0 0 0; font-size: 12px; color: #94a3b8;">
        Free consultation • Strategic roadmap • 30-minute session
      </p>
    </div>

    <!-- Footer -->
    <div style="padding: 20px; background: rgba(0, 0, 0, 0.8); color: white; text-align: center; border-top: 1px solid rgba(0, 255, 255, 0.1);">
      <p style="margin: 0 0 5px 0; font-size: 14px; font-weight: 600; color: #00ffff;">BUZZBANDITS</p>
      <p style="margin: 0; font-size: 12px; color: #adb5bd;">
        <a href="https://buzzbandits.net" style="color: #00ffff; text-decoration: none;">buzzbandits.net</a> | 
        <span style="color: #6c757d;">Reply for direct access</span>
      </p>
    </div>

  </div>
  
  <style>
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  </style>
</body>
</html>`;
};
// Generate team notification email
const generateTeamEmailHTML = (reportData, websiteUrl, userEmail) => {
  const { summary, issues, recommendations } = reportData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Website Audit Lead</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🎯 New Website Audit Lead!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Potential client with ${summary.overallScore}/100 score</p>
        </div>

        <!-- Lead Info -->
        <div style="padding: 30px; background: #f8f9fa; border-bottom: 1px solid #e9ecef;">
          <h3 style="margin: 0 0 20px 0; color: #495057;">Lead Information</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <p style="margin: 0 0 10px 0;"><strong>Website:</strong> <a href="${websiteUrl}" style="color: #667eea; text-decoration: none;">${websiteUrl}</a></p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${userEmail}</p>
            <p style="margin: 0 0 10px 0;"><strong>Overall Score:</strong> <span style="color: ${getScoreColor(summary.overallScore)}; font-weight: bold;">${summary.overallScore}/100</span></p>
            <p style="margin: 0;"><strong>Analyzed:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
        </div>

        <!-- Opportunity Assessment -->
        <div style="padding: 30px;">
          <h3 style="margin: 0 0 20px 0; color: #495057;">Opportunity Assessment</h3>
          
          <!-- Scores -->
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
            ${Object.entries(summary.grades).map(([key, grade]) => `
              <div style="flex: 1; min-width: 100px; background: #f8f9fa; padding: 10px; border-radius: 6px; text-align: center; border-left: 3px solid ${getScoreColor(grade.score)};">
                <div style="font-size: 18px; font-weight: bold; color: ${getScoreColor(grade.score)};">${grade.score}</div>
                <div style="font-size: 11px; text-transform: uppercase; color: #6c757d;">${key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            `).join('')}
          </div>

          <!-- Business Potential -->
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
            <h4 style="margin: 0 0 15px 0; color: #155724;">💰 Business Potential</h4>
            <ul style="margin: 0; padding-left: 20px; color: #155724;">
              <li><strong>Critical Issues:</strong> ${issues.total} issues found (high urgency)</li>
              <li><strong>Revenue Impact:</strong> ${summary.overallScore < 70 ? 'HIGH' : summary.overallScore < 85 ? 'MEDIUM' : 'LOW'} potential for traffic/conversion gains</li>
              <li><strong>Competition Advantage:</strong> ${summary.overallScore < 60 ? 'Easy wins available' : 'Optimization opportunities exist'}</li>
              <li><strong>Estimated Monthly Value:</strong> ${summary.overallScore < 50 ? '2,000-5,000' : summary.overallScore < 70 ? '1,000-3,000' : '500-1,500'}</li>
            </ul>
          </div>

          <!-- Action Items -->
          <div style="margin-top: 20px; background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h4 style="margin: 0 0 15px 0; color: #856404;">⚡ Immediate Actions</h4>
            <ul style="margin: 0; padding-left: 20px; color: #856404;">
              <li>Follow up within 24 hours while report is fresh</li>
              <li>Highlight the ${issues.total} critical issues found</li>
              <li>Offer free strategy call to discuss implementation</li>
              <li>Emphasize competitor advantage opportunities</li>
            </ul>
          </div>

        </div>

        <!-- Footer -->
        <div style="padding: 20px 30px; background: #495057; color: white; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            <strong>BuzzBandits Team Dashboard</strong> | 
            Generated by Website Audit Tool
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
};

module.exports = {
    requestCallback,
    getInTouch,
    generateWebsiteReport
};
