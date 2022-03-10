import fs from 'fs';
import readLine from 'readline';
type OutputType = {
 "valid-domains": Set<string>;
 "totalEmailsParsed": number;
 "totalValidEmails": number;
 "categories": { [key: string]: number };
};
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
function analyseFiles(inputPaths: string[], outputPath: string) {
 const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 let output: OutputType = {
  "valid-domains": new Set(),
  "totalEmailsParsed": 0,
  "totalValidEmails": 0,
  "categories": {}
};
//index is the index of each element in path while the path is all the elements
for (const [index, path] of inputPaths.entries()) {
  console.log(inputPaths)
  // create a read stream
  const fileStream = fs.createReadStream(path);
  // for reading the file one line at a time
  const reader = readLine.createInterface({
    input: fileStream // file stream to read
  });
  // for each line
  reader.on('line', foo => {
    if (foo !== 'Emails') {
      const email = foo;
      // check if the email is a valid email
      const isValidEmail = regex.test(email); //why did we put regex in the email?
      // if email is valid do all this
      if (isValidEmail) {
        const domain = email.split('@')[1];
        output['valid-domains'].add(domain);
        output.totalValidEmails++;
        // check if this domain is already inside
        // categories object
        if (output.categories[domain]) {
          // if it exists increment it by 1
          output.categories[domain]++;
        } else {
          // if it does not exist
          // add it and set it's value to 1
          output.categories[domain] = 1;
        }
      }
      // increment total by 1 whether valid or invalid
      output.totalEmailsParsed++;
    }
  });
  if (index === inputPaths.length - 1) {
    fileStream.on('end', () => {
      // convert valid-domains to an Array
      const result = {
        ...output, // add all the properties from output
        'valid-domains': Array.from(output['valid-domains'])
      };
      // stringify the result
      const fileData = JSON.stringify(result);
      // create output file using the outputPath that was given
      fs.appendFileSync(outputPath, fileData);
    });
  }
}
}
// export default analyseFiles;