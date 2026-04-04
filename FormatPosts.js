  // Now we have the posts we just need to format them onto the page
    var MonthNames=["Indexes","January","February","March","April","May","June","July","August","September","October","November","December","Overview"];
    var NumberOfEntries=PostTitles.length;
	if (OutputType == "") {
		OutputType = "Short";
	}

//   Loop around each entry in the index (last first)

  document.write("Index of "+NumberOfEntries+" "+IndexType+"s <br/>");

  
//    for(var EntryNum = 0; EntryNum < NumberOfEntries; EntryNum++)
    for(var EntryNum = NumberOfEntries - 1; EntryNum >= 0; EntryNum--)
    {
 NameOfMonth = MonthNames[parseInt(PostMonths[EntryNum],10)]
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

   
//   fiddle to remove date from indexes....
   if (parseInt(PostDays[EntryNum],10).isNaN) {
     let DayNum="";
   }
   else {
     DayNum = PostDays[EntryNum];
 }
// now exclude the formatting for the day and type
      if(currentMonth=="Indexes" || currentMonth=="Overview") {
        document.write("&nbsp;&nbsp;");
      } else {
  		document.write("<B>"+ DayNum +':&nbsp;'+PostWalk[EntryNum]+"</B>&nbsp;-&nbsp;");
      }    
///  write out the rest if the entry on two lines
  document.write('<a href ="'+PostURLs[EntryNum]+'" target="_blank">'+PostTitles[EntryNum]+" "+PostTags[EntryNum]+"</a>");
//  document.write('<P style="text-indent:10px"><I>'+PostSummary[EntryNum]+"</I></P>");    }
if (OutputType =="Short") {
	        document.write("<br />");
} else {
  document.write('<ul style="list-style-type:none;"><li><I>'+PostSummary[EntryNum]+"</I></li></ul>");
}

    }
        document.write("</ul></ul>");
