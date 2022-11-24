# replace-file-by-list
replace files by a user-defined replacement list

# Install
```
npm install replace-file-by-list
```

# Usage & Api
```javascript

var replace_file_by_list = require("replace-file-by-list");

var replaceList = [
	"1.txt", [
		"bbbb", "b11b",
		/aaaa/g, "a22a"
	],
	"2.txt", [
		/.+/g, (s0) => { return s0 + "-" + s0.length; },
	],
]

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
var cnt = replace_file_by_list(
	replaceList,
	{
		srcDir: __dirname + "/sample",
		destDir: __dirname + "/sample/output",
	}
);

```
