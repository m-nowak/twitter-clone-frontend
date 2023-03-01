import moment from "moment";

export function getDateFromNow(d) {
  const date = moment(d).fromNow(true).split(" ");
  let fromNow = date[0] + date[1].slice(0, 2);
  let createdAt = date[0] + date[1].slice(0, 1);
  if (fromNow === "afe") {
    createdAt = "1s";
  }
  if (fromNow === "ami") {
    createdAt = "1m";
  }
  if (fromNow === "anho") {
    createdAt = "1h";
  }
  if (fromNow === "ada") {
    createdAt = "1d";
  }
  if (fromNow === "amo") {
    createdAt = "1m";
  }
  if (fromNow === "aye") {
    createdAt = "1y";
  }
  return createdAt;
}

export function getDate(d) {
  const date = moment(d).format("MMM D, YYYY ");
  return date;
}
export function getTime(d) {
  const time = moment(d).format("h:mm A");
  return time;
}
