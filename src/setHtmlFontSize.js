class changeFontSize{
    setHtmlFontSize() {
        const htmlWidth =document.documentElement.clientWidth || document.body.clientWidth;
        const htmlDom = document.getElementsByTagName("html")[0];
        htmlDom.style.fontSize = htmlWidth / 10 + "px";
        document.body.style.backgroundColor="#F2F2F2";
        console.log(htmlDom.style.fontSize);
      }
}
  export default changeFontSize