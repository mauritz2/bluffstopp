const Constants = new function() {
    this.CARD_VALUE_MAP = {
        "2":2,
        "3":3,
        "4":4,
        "5":5,
        "6":6,
        "7":7,
        "8":8,
        "9":9,
        "10":10,
        "jack":11,
        "queen":12,
        "king":13,
        "ace":14
    };
    this.CARD_VALUES = Object.keys(this.CARD_VALUE_MAP);
    this.CARD_SUITS = ["diamonds", "spades", "clovers", "hearts"];
  }
  export default Constants;
