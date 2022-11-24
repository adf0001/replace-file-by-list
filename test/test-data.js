
//global variable, for html page, refer tpsvr @ npm.
replace_file_by_list = require("../replace-file-by-list.js");

module.exports = {

	"replace_file_by_list": function (done) {
		if (typeof window !== "undefined") throw "disable for browser";

		var replaceList = [
			"1.txt", [
				"bbbb", "b11b",
				/aaaa/g, "a22a"
			],
			"2.txt", [
				/.+/g, (s0) => { return s0 + "-" + s0.length; },
			],
		]

		var cnt = replace_file_by_list(
			replaceList,
			{
				srcDir: __dirname + "/sample",
				destDir: __dirname + "/sample/output",
			}
		);

		done(!(
			cnt === 2
		));
	},

	"check exports": function (done) {
		var m = replace_file_by_list;
		for (var i in m) {
			if (typeof m[i] === "undefined") { done("undefined: " + i); return; }
		}
		done(false);

		console.log(m);
		var list = "export list: " + Object.keys(m).join(", ");
		console.log(list);
		return list;
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('replace_file_by_list', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
