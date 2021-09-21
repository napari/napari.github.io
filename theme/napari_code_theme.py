from pygments.style import Style
from pygments.token import (
  Comment,
  Error,
  Generic,
  Keyword,
  Literal,
  Name,
  Operator,
  Punctuation,
  String,
)

# Pygments style class based on GitHub code style:
# https://git.io/Jz85x
class NapariCodeTheme(Style):
    background_color = "#f7f7f7"

    styles = {
          Comment:                "italic #6f6f6f",
          Comment.Multiline:      "italic #6f6f6f",
          Comment.Preproc:        "bold #999999",
          Comment.Single:         "italic #6f6f6f",
          Comment.Special:        "bold italic #999999",
          Error:                  "bg:#e3d2d2 #a61717",
          Generic.Deleted:        "bg:#ffdddd #000000",
          Generic.Emph:           "italic #000000",
          Generic.Error:          "#eb1000",
          Generic.Heading:        "#999999",
          Generic.Inserted:       "bg:#ddffdd #000000",
          Generic.Output:         "#888888",
          Generic.Prompt:         "#555555",
          Generic.Strong:         "bold",
          Generic.Subheading:     "#aaaaaa",
          Generic.Traceback:      "#aa0000",
          Keyword:                "bold #7518a1",
          Literal.Number:         "#227b81",
          Literal.String:         "#0074b8",
          Name:                   '#000',
          Name.Attribute:         "#7518a1",
          Name.Builtin:           "#7518a1",
          Name.Builtin.Pseudo:    "#999999",
          Name.Class:             "bold #5471a0",
          Name.Constant:          "#7518a1",
          Name.Decorator:         "bold #3c5d5d",
          Name.Entity:            "#800080",
          Name.Exception:         "bold #990000",
          Name.Function:          "bold #004166",
          Name.Label:             "bold #990000",
          Name.Namespace:         "#555555",
          Name.Tag:               "#000080",
          Name.Variable:          "#7518a1",
          Name.Variable.Class:    "#7518a1",
          Name.Variable.Global:   "#7518a1",
          Name.Variable.Instance: "#7518a1",
          Operator:               "#956441",
          Punctuation:            '#000',
          String:                 "#0074b8",
    }
