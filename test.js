let output = [
    "",
    " Sure",
    "!",
    " Here",
    "'",
    "s",
    " a",
    " cook",
    "ing",
    " play",
    "list",
    " that",
    "'",
    "s",
    " fun",
    " to",
    " listen",
    " to",
    " with",
    " your",
    " friends",
    ",",
    " prior",
    "it",
    "izing",
    " the",
    " best",
    " songs",
    " to",
    " match",
    " the",
    " prompt",
    " while",
    " also",
    " considering",
    " your",
    " favorite",
    " artists",
    ":",
    "\n",
    "\n",
    "[",
    "\n",
    "",
    " {",
    "\n",
    "  ",
    " \"",
    "art",
    "ist",
    "\":",
    " \"",
    "G",
    "lass",
    " Anim",
    "als",
    "\",",
    "\n",
    "  ",
    " \"",
    "title",
    "\":",
    " \"",
    "Black",
    " Mam",
    "bo",
    "\"",
    "\n",
    "",
    " },",
    "\n",
    "",
    " {",
    "\n",
    "  ",
    " \"",
    "art",
    "ist",
    "\":",
    " \"",
    "The",
    " N",
    "ude",
    " Party",
    "\",",
    "\n",
    "  ",
    " \"",
    "title",
    "\":",
    " \"",
    "Che",
    "v",
    "ro",
    "let",
    "\"",
    "\n",
    "",
    " },",
    "\n",
    "",
    " {",
    "\n",
    "  ",
    " \"",
    "art",
    "ist",
    "\":",
    " \"",
    " alt",
    "-",
    "J",
    "\",",
    "\n",
    "  ",
    " \"",
    "title",
    "\":",
    " \"",
    "E",
    "vil",
    " E",
    "ye",
    "\"",
    "\n",
    "",
    " },",
    "\n",
    "",
    " {",
    "\n",
    "  ",
    " \"",
    "art",
    "ist",
    "\":",
    " \"",
    "SHA",
    "ED",
    "\",",
    "\n",
    "  ",
    " \"",
    "title",
    "\":",
    " \"",
    "Tr",
    "amp",
    "oline",
    "\"",
    "\n",
    "",
    " },",
    "\n",
    "",
    " {",
    "\n",
    "  ",
    " \"",
    "art",
    "ist",
    "\":",
    " \"",
    "R",
    "at",
    "at",
    "at",
    "\",",
    "\n",
    "  ",
    " \"",
    "title",
    "\":",
    " \"",
    "C",
    "ream",
    " on",
    " Chrome",
    "\"",
    "\n",
    "",
    " },",
    "\n",
    "",
    " {",
    "\n",
    "  ",
    " \"",
    "art",
    "ist",
    "\":",
    " \"",
    "G",
    "oth",
    " B",
    "abe",
    "\",",
    "\n",
    "  ",
    " \"",
    "title",
    "\":",
    " \"",
    "R",
    "os",
    "em",
    "ary",
    "\"",
    "\n",
    "",
    " },",
    "\n",
    "",
    " {",
    "\n",
    "  ",
    " \"",
    "art",
    "ist",
    "\":",
    " \"",
    "G",
    "or",
    "illa",
    "z",
    "\",",
    "\n",
    "  ",
    " \"",
    "title",
    "\":",
    " \"",
    "Fe",
    "el",
    " Good",
    " Inc",
    ".\"",
    "\n",
    "",
    " }",
    "\n",
    "]",
    "\n",
    "\n",
    "This",
    " play",
    "list",
    " includes",
    " three",
    " songs",
    " from",
    " your",
    " favorite",
    " artists",
    ",",
    " G",
    "lass",
    " Anim",
    "als",
    ",",
    " The",
    " N",
    "ude",
    " Party",
    ",",
    " and",
    " alt",
    "-",
    "J",
    ",",
    " while",
    " also",
    " incorpor",
    "ating",
    " other",
    " songs",
    " that",
    " fit",
    " the",
    " v",
    "ibe",
    " of",
    " a",
    " fun",
    " cook",
    "ing",
    " play",
    "list",
    " with",
    " friends",
    ".",
    " It",
    " features",
    " a",
    " mix",
    " of",
    " ind",
    "ie",
    " rock",
    ",",
    " alternative",
    ",",
    " and",
    " electronic",
    " music",
    " to",
    " create",
    " an",
    " up",
    "be",
    "at",
    " and",
    " ener",
    "get",
    "ic",
    " atmosphere",
    " for",
    " your",
    " cook",
    "ing",
    " session",
    ".",
    " En",
    "jo",
    "y",
    "!"
]
output = output.join("")

let startIndex = output.indexOf('[');
let endIndex = output.lastIndexOf(']') + 1;

// Extract the array substring
let arrayStr = output.slice(startIndex, endIndex);

// Parse the substring into an actual array
let array = JSON.parse(arrayStr);

console.log(array); // logs the extracted array

