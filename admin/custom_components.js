document.addEventListener('DOMContentLoaded', function () {
    if (window.CMS) {
      const CMS = window.CMS;
  
      CMS.registerEditorComponent({
        // Identifier for the component
        id: "insert-date",
        // Label for the button on the editor toolbar
        label: "Insert Date and Line",
        // The React component that should be rendered
        // This function now returns the date and a horizontal line as it will appear in the markdown
        toBlock: function() {
          return `${new Date().toISOString().slice(0, 10)}
  ---
  `; // Inserts the date and horizontal line
        },
        // Function to create the text to insert in the editor preview
        toPreview: function(obj) {
          return `${obj.date}
  ---
  `; // Preview also shows the date and horizontal line
        },
        // Adding the button to the markdown editor toolbar
        buttons: [{
          label: "Insert Date and Line",
          handler: function (editor) {
            const cursorPosition = editor.getCursor();
            const date = new Date().toISOString().slice(0, 10)
            const dateWithLine = `${date}
  ---
  `; // Template literal with actual line breaks
            editor.replaceSelection(dateWithLine);
            editor.setCursor(cursorPosition.line + 2, cursorPosition.ch + dateWithLine.length);
          }
        }]
      });
    }
  });
  