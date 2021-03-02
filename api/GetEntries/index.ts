import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            text: responseMessage,
            entries: [
                {
                    name: "Horys",
                    date: 1614712802,
                    amount: 5
                },
                {
                    name: "Horys",
                    date: 1614608402,
                    amount: 2
                },
                {
                    name: "Bob",
                    date: 1614658402,
                    amount: 42
                },
                {
                    name: "Alice",
                    date: 1614628402,
                    amount: 42
                }
                
            ]
        }

    };

};

export default httpTrigger;