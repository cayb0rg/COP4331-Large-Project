// Pull out command line executor
import { exec } from "child_process"

// Get command line arguments
const args = process.argv;

// If there is somethign missing or the port is not a number
if (args.length < 3 || Number.isNaN(Number(args[2]))) {
    const message = `There has been an error with your command line arguments!\nArguments:\n[\n\t${args.toString().replace(/,./gi, ",\n\t")}\n]`;
    throw new Error(message);
};

// Get the port
const PORT = args[2];

// Get all processes running at the port
exec(`lsof -i :${PORT}`, (error, stdout, stderr) => {

    // There are no processes running at the port
    if (stdout === "")
        console.log(`There are no processes running on PORT ${PORT}!\nMOVING ON...\n`);
    // There is an error
    else if (error) {
        console.log(`There was an error processing command lsof -i :${PORT}`);
        throw new Error(error);
    // There is no error
    } else {

        // Store the relevant index mapping for portProcessesList if needed
        const mapping = {
            0: "PROCESS_NAME",
            1: "PROCESS_ID",
            2: "PROCESS_USER",
            3: "PROCESS_IP_TYPE",
            4: "PROCESS_DEVICE_ADDRESS",
            5: "PROCESS_SIZE_OFFSET",
            6: "PROCESS_NODE",
            7: "PROCESS_SOURCE_LOCATION"
        };

        // Cleans processes @ port information
        let portProcessesList = stdout.split("\n").map((line, index) => line.split(" ").filter(el => el != ""));
        portProcessesList = portProcessesList.slice(1, portProcessesList.length - 1).map(([ PROCESS_NAME, PROCESS_ID ]) => Number(PROCESS_ID));

        // Iterate over all processes running at the port
        for (const RUNNING_PROCESS_ID_AT_PORT of portProcessesList) {

            // Kill the process
            exec(`kill -9 ${RUNNING_PROCESS_ID_AT_PORT}`, (error, stdout, stderr) => {
                // If there is an error
                if (error) {
                    console.log(`There was an error processing command kill -9 ${RUNNING_PROCESS_ID_AT_PORT}`);
                    throw new Error(error);
                // The processes has been killed
                } else
                    console.log(`KILLED PROCESS ${RUNNING_PROCESS_ID_AT_PORT} @ PORT ${PORT}`);
            });
        };

    };

});