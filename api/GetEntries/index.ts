import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest, entries): Promise<void> => {
    context.log("HTTP trigger function processed a request for list of entries.");

    context.res = {
        body: {
            entries
        }
    };

};

export default httpTrigger;
