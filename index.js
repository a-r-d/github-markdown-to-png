const argv = require('yargs').argv;
const fs = require('fs');
const execSync = require('child_process').execSync;
const path = require('path');
const mkdirp = require('mkdirp');

let mdFile = argv.i,
  pngDir = argv.o || './pngs',
  tmpDir = argv.t || '/tmp';

// make sure that the PNG dir exists.
mkdirp.sync(pngDir);

const mdData = fs.readFileSync(mdFile, 'utf8');
const re = /```[a-z]*\n([\s\S]*?\n)```/gi;

let m;
const codeblocks = [];
while ((m = re.exec(mdData)) !== null) {
  if (m.index === re.lastIndex) {
    re.lastIndex++;
  }
  codeblocks.push(m[0]);
}

const npmBinDir = path.join(__dirname, 'node_modules', '.bin');
const phantom = path.join(npmBinDir, 'phantomjs');
const m2p = path.join(npmBinDir, 'm2p');

codeblocks.forEach((code, iter) => {
  console.log('Writing:', code);

  // save the temp markdown file
  let tmpMd = tmpDir + '/' + path.basename(mdFile, '.md') + '_' + iter + '.md';
  fs.writeFileSync(tmpMd, code, 'utf8');

  // make the intermediary PDF
  let outFileName = tmpDir + '/' + path.basename(mdFile, '.md') + '_' + iter + '.pdf';
  console.log('Creating PDF: ', outFileName);
  execSync(`
alias phantomjs=${phantom}
${m2p} ${tmpMd} ${outFileName}
  `);

  // now we make the png
  let pngName = pngDir + '/' + path.basename(mdFile, '.md') + '_' + iter + '.png';
  console.log('Using imagemagic to make png: ', pngName);
  execSync('convert -density 300 ' + outFileName + ' -quality 100 -trim ' + pngName);

});
