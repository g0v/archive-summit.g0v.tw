require! <[fs]>
require! zh: '../zh-tw/schedule.ls'
require! en: '../en-us/schedule.ls'

recur = (zh,en,des) ->
  for k,v of zh
    if not (k of en) => 
      console.log "bug: k"
      continue
    if typeof(v) == typeof({}) and !v.length =>
      des[k] = {}
      recur(zh[k],en[k],des[k])
      continue

    des["#{k}_zh"] = zh[k]
    des["#{k}_en"] = en[k]
result = {}
recur zh,en,result

dump = (obj, lv) ->
  for k,v of obj
    u = if typeof(v)==typeof({}) => "" else " "+JSON.stringify(v)
    console.log "#{'  '*lv}#k:#u"
    if typeof(v)==typeof({}) => dump obj[k], lv+1
dump result, 1
