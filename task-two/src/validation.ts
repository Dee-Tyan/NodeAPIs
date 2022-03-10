import dns from 'dns';
import fs from 'fs';
import readLine from 'readline';
const dnsSync = dns.promises;
/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  fs.appendFileSync(outputFile, 'Emails\n');
  for await (const path of inputPath) {
    const readStream = fs.createReadStream(path);
    const reader = readLine.createInterface({
      input: readStream,
    });
    for await (const line of reader) {
      if (line !== 'Emails') {
        const email = line;
        try {
          const domain = email.split('@')[1];
          await dnsSync.resolveMx(domain);
          fs.appendFileSync(outputFile, email + '\n');
        } catch (error) {
          console.log((error as Error).message);
          continue;
        }
      }
    }
  }
}
export default validateEmailAddresses;