import axios, {AxiosError} from 'axios';
import config from "config";

const url = config.get<string>("server.url");
const [action, ...args] = process.argv.slice(2);

const executeAction = async (action: string, args: string[]): Promise<any> => {
    switch (action) {
        case "get":
            try {
                const response = await axios.get(`${url}/cars`);
                console.log(response.data);
                return {message: "Car found successfully"};
            } catch (error) {
                console.error((error as AxiosError).message);
                return {error: "Cars not found"};
            }
        case "add":
            try {
                const [brand, name, year, price] = args;
                await axios.post(`${url}/cars`, {brand, name, year, price});
                return {message: "Car added successfully"};
            } catch (error) {
                console.error((error as AxiosError).message);
                return {error: "Failed to add car"};
            }
        case "upd":
            try {
                const [id, brand, name, year, price] = args;
                await axios.put(`${url}/cars/${id}`, {brand, name, year, price});
                return {message: "Car updated successfully"};
            } catch (error) {
                console.error((error as AxiosError).message);
                return {error: "Failed to update car"};
            }
        case "del":
            try {
                const [id] = args;
                await axios.delete(`${url}/cars/${id}`);
                return {message: "Car deleted successfully"};
            } catch (error) {
                console.error((error as AxiosError).message);
                return {error: "Failed to delete car"};
            }
        default:
            return {error: "Invalid action"};
    }
};

executeAction(action, args).then(value => console.log(value.message));
