export default async function submitForm (
    clientEmail: string,
    clientName: string,
    subject: string,
    html: string
) {

    try {

        const mailAPI = (import.meta as ImportMeta & {
            env: { VITE_MAILER_API: string };
          }).env.VITE_MAILER_API;

        const apiPayload = {
            clientEmail: clientEmail,
            clientName: clientName,
            subject: subject,
            html: html,
            plain: html.replace(/<[^>]+>/g, ' ')
        };

        console.log(apiPayload);

        const response = await fetch(mailAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(apiPayload)
        });

        


    } catch (error) {

        console.error("Form submission error:", error);
    
        return;
        
    }
}