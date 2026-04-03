  // Now we have the posts we just need to format them onto the page
    var MonthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
    var NumberOfEntries=PostTitles.length;

//   Loop around each entry in the index (last first)

  document.write("Index of "+NumberOfEntries+" walks <br/>");

  
//    for(var EntryNum = 0; EntryNum < NumberOfEntries; EntryNum++)
    for(var EntryNum = NumberOfEntries - 1; EntryNum >= 0; EntryNum--)
    {
 NameOfMonth = MonthNames[parseInt(PostMonths[EntryNum],10)-1]
 let TagList = PostTags[EntryNum];
 if (TagList !== "") {
   TagList = "(" + TagList + ")"
 }
                
 if (currentYear != PostYears[EntryNum]) {
  if (currentYear == "") {
      document.write("<ul class='dateStyle'>");
  }
   else {
      document.write("</ul>");
   }
   
   currentYear = PostYears[EntryNum];
   currentMonth = "";

  document.write("<li><B>"+currentYear+" </B></li><ul>");
 }

        
 if (currentMonth != NameOfMonth) {
  currentMonth = NameOfMonth;

  document.write("<li><B>" + currentMonth+" </B></li>");
 }

  document.write("<B>"+parseInt(PostDays[EntryNum],10)+":&nbsp;"+PostWalk[EntryNum]+"</B>-&nbsp;");
  document.write('<a href ="'+PostURLs[EntryNum]+'" target="_blank">'+PostTitles[EntryNum]+"("+PostTags[EntryNum]+")</a>");
  document.write("<BR />");
//  document.write('<P style="text-indent:10px"><I>'+PostSummary[EntryNum]+"</I></P>");    }
//  document.write('<ul style="list-style-type:none;"><li><I>'+PostSummary[EntryNum]+"</I></li></ul>");
    }
        document.write("</ul></ul>");
