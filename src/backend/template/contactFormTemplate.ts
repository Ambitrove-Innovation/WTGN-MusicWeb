export default function getHtmlBody (
    senderEmail: string,
    senderName: string,
    eventType: string,
    eventdate: string,
    venueLocation: string,
    message: string
): string {
    
    return `
    
        <html>
        <head>
            <title>New Contact Form Submission from ${senderName || "Website Visitor"}</title>
        </head>
        <body style="font-family: Arial, Helvetica, sans-serif; color: #000000; margin: 0; padding: 0;">

            <div style="margin-bottom: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: normal;">

                <h3>New Lead / Contact Submission</h3>
                <p><strong>Name:</strong> ${senderName || "Not provided"}</p>
                <p><strong>Reply-to Email:</strong> ${senderEmail}</p>
                <hr/>
                <p><strong>Event Type:</strong> ${eventType}</p>
                <p><strong>Event Date:</strong> ${eventdate}</p>
                <p><strong>Venue / Location:</strong> ${venueLocation}</p>
                <p style="white-space: pre-wrap;">${message}</p>
            </div>

        </body>
        </html>
`

};