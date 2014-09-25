require! <[fs]>

a = fs.read-file-sync \schedul.ls .toString!split \\r\n
a = a.filter -> !(/^[ \r\n]+$/.exec it)
fs.write-file-sync \output.ls, a.join(\\n)
