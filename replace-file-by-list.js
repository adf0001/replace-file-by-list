
// replace-file-by-list @ npm, replace files by a user-defined replacement list

var fs = require("fs");
var path = require("path");

/*
replace files by a user-defined replacement list

replaceFileByList( replaceList [, options] )

	replaceList
		[
			filePath1, [
				rplArg1a, rplArg1b,
				rplArg2a, rplArg2b,
				...
			],
			filePath2, [ ... ],
		]

		* rplArgNa, rplArgNb
			a pair of arguments for String.replace(rplArgNa, rplArgNb)

	options
		.srcDir
			optional, source dir path.
		.destDir
			optional, detination dir path.
			default is same as srcDir, i.e. write to the source files.

		.silent
			don't output log message

return updated files count.
*/
module.exports = function (replaceList, options) {
	//arguments
	var { srcDir, destDir, silent } = { srcDir: "", destDir: "", ...options };

	if (srcDir) srcDir = path.normalize(srcDir + "/");

	//process
	var i, imax = replaceList.length, ri, j, jmax;
	var fnSrc, fnDest, fnDir, code0, code, codei, updateCount = 0;

	function saveCode(fn, code0, code) {
		if (code0 === code) {
			if (!silent) console.log("!!! skip " + fn);
		}
		else {
			fnDir = path.dirname(fn);
			if (!fs.existsSync(fnDir)) fs.mkdirSync(fnDir, { recursive: true });

			fs.writeFileSync(fn, code);
			if (!silent) console.log("file updated, " + fn);
			updateCount++;
		}
	}

	for (i = 0; i < imax; i++) {
		ri = replaceList[i];
		if (typeof ri === "string") {
			//save previous
			if (fnDest) saveCode(fnDest, code0, code);

			fnSrc = path.normalize(path.join(srcDir, ri));
			fnDest = path.join(destDir, ri);

			code = code0 = fs.readFileSync(fnSrc).toString();
			continue;
		}
		if (!(ri instanceof Array)) continue;

		jmax = ri.length;
		for (j = 0; j < jmax; j += 2) {
			codei = code.replace(ri[j], ri[j + 1]);

			if (!silent) console.log(((codei === code) ? "! unchanged" : "updated") + ", " +
				fnSrc.slice(srcDir.length) + ", replace (" + ri[j] + ") with (" + ri[j + 1] + ")");

			if (codei !== code) code = codei;
		}
	}

	//save last
	if (fnDest) saveCode(fnDest, code0, code);

	return updateCount;
}
