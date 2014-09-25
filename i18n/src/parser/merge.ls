require! <[fs]>
require! a: './zh-tw/schedule.ls'
require! b: './en-us/schedule.ls'

recur = (zh,en,des) ->
  for k,v of zh
    if not (k of en) => 
      console.log "bug: k"
      continue
    if typeof(v) == typeof({}) =>
      des[k] = {}
      recur(zh[k],en[k],des[k])
      continue
    des[k] = {zh:zh[k], en:en[k]}
c = {}
recur a,b,c

fs.write-file-sync "schedul.ls",JSON.stringify(c)
