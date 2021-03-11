import {AzureFunction, Context, HttpRequest} from "@azure/functions";

interface Entry {
    name: string;
    amount: number;
}

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    console.log("Create new entry HTTP Function called" + req);

    const newEntry: Entry = req.body;
    if (!isEntryValid(newEntry)) {
        context.res = {
            status: 400,
            body: { message: "Cannot create invalid entry" }
        };
        return;
    }

    context.bindings.entries = JSON.stringify(newEntry);
    context.res = {
        body: { message: `Created new ${newEntry.amount}km entry for ${newEntry.name}` }
    };
    context.done();
};

function isEntryValid(entry: Entry): boolean {
    return entry
        && entry.name && entry.name.length >= 3 && entry.name.length <= 15
        && entry.amount && entry.amount >= 0.1 && entry.amount <= 50;
}

export default httpTrigger;
