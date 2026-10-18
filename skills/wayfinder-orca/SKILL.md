---
name: wayfinder-orca
description: Show a wayfinder map as a star-map in a tab of Orca's built-in browser. Use when the user asks to show, open, view, render or refresh a wayfinder map (or "the map", "the plan") inside Orca, whether the map lives in a local .plan/ folder or in GitHub issues.
---

# Wayfinder map in Orca

`scripts/wayfinder-orca` sits two levels above this file, at the root of the wayfinder-maps repo. It starts `wayfinder-maps serve` in the background if nothing answers on port 7777, then opens a tab in the current Orca worktree at `http://localhost:7777/?path=<dir>`. If a tab already shows that URL, the script switches to it. It prints the URL.

The page polls the files on disk, so the open tab redraws after you edit a ticket. Do not reopen it.

## Map in a local `.plan/`

```sh
<repo>/scripts/wayfinder-orca            # enclosing git repo: list of its maps
<repo>/scripts/wayfinder-orca .plan/foo  # one effort: straight to its map
```

## Map kept as GitHub issues

Find the map issue with `gh issue list -l wayfinder:map --state all`. Mirror it into a cache outside the repo so nothing lands in the working tree, then open the cache:

```sh
cache="${XDG_CACHE_HOME:-$HOME/.cache}/wayfinder-maps/<owner>-<repo>/.plan/<map-number>"
<repo>/scripts/wayfinder-pull <owner>/<repo> <map-number> "$cache"
<repo>/scripts/wayfinder-orca "$cache"
```

`wayfinder-pull` wipes and rewrites the cache on every run. To refresh the map after the tracker changes, run the pull again; the tab picks it up on its next poll.

## Outside the current worktree

The tab opens in the Orca worktree that contains the shell's working directory. To put it in a different one, set `ORCA_WORKTREE` to any `orca` worktree selector, such as `ORCA_WORKTREE=path:/abs/repo`.

## Failures

- `wayfinder-maps not found`: run `go install ./cmd/wayfinder-maps` from the repo root.
- `the server on :7777 ignores ?path=`: an older build holds the port. Stop it with `pkill -f 'wayfinder-maps serve'` and rerun.
- The server log is at `$TMPDIR/wayfinder-maps-7777.log`.
