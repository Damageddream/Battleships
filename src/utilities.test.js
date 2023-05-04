import { makeCoords } from "./utilities";

test('checking if given start and end level will return full array', ()=>{
    expect(makeCoords('a1', 'a4', 4)).toEqual(['a1','a2','a3','a4'])
})

test('checking if given start and end vertical will return full array', ()=>{
    expect(makeCoords('a4', 'c4', 3)).toEqual(['a4','b4','c4'])
})

test('checking if lenght is 1, return 1 coord', ()=>{
    expect(makeCoords('a1')).toEqual(['a1'])
})
