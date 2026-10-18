// The bottom HUD bar: map title, status counts (which double as the legend)
// and a progress bar.
import {S} from "./state.js";
import {el} from "./util.js";

export function buildHud() {
  var hud = document.getElementById("hud"); hud.innerHTML = "";
  var title = el("div", "htitle");
  title.appendChild(el("h1", null, S.graph.name));
  if (S.graph.destination) title.appendChild(el("div", "dest", S.graph.destination));
  hud.appendChild(title);
  hud.appendChild(el("div", "spacer"));
  var c = S.graph.counts, counts = el("div", "counts");
  function chip(cls, txt) { counts.appendChild(el("span", "c " + cls, txt)); }
  chip("resolved", c.resolved + " resolved"); chip("frontier", frontierCount() + " frontier");
  if (c.claimed) chip("claimed", c.claimed + " claimed");
  chip("blocked", blockedCount() + " blocked");
  if (c.outOfScope) chip("oos", c.outOfScope + " out of scope");
  hud.appendChild(counts);
  var bar = el("div", "bar"); var span = document.createElement("span");
  span.style.width = (c.total ? Math.round(c.resolved * 100 / c.total) : 0) + "%"; bar.appendChild(span); hud.appendChild(bar);
}

function frontierCount() { var n = 0; S.nodes.forEach(function(x) { if (x.status === "frontier") n++; }); return n; }
function blockedCount() { var n = 0; S.nodes.forEach(function(x) { if (x.status === "blocked") n++; }); return n; }
