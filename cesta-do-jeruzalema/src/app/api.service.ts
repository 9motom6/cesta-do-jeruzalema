import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CreateEntry, Entry} from "./models";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

interface EntryDto {
    name: string;
    amount: number;
    id: string;
    ts: number;
}

interface EntriesDto {
    entries: EntryDto[];
}

@Injectable({
    providedIn: "root"
})
export class ApiService {

    rootUrl = "/api";

    constructor(private http: HttpClient) {
    }

    getEntries(): Observable<Entry[]> {
        return this.http.get(this.rootUrl + "/entries").pipe(map((entries: EntriesDto) => {

            const mappedEntries: Entry[] = entries.entries.map(((entry: EntryDto) => {
                return { ...entry, date: new Date(entry.ts * 1000) };
            }));

            mappedEntries.push(...mappedEntries);

            return mappedEntries;
        })) as Observable<Entry[]>;
    }

    addEntry(newEntry: CreateEntry): Observable<{ message: string }> {
        return this.http.post(this.rootUrl + "/entries/add", newEntry) as Observable<{ message: string }>;
    }
}
