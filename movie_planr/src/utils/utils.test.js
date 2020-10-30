const utils = require('./utils');
const fs = require('fs');

test('"153" should be 153', () => {
    expect(utils.retNum('153')).toBe(153);
})

test('"100.534" should be 100.534', () => {
    expect(utils.retNum('100.534')).toBe(100.534);
})

test('zips two arrays into one', () => {
    const output = utils.zip([1], [2]);
    const expected = [[1, 2]];

    expect(output).toStrictEqual(expected);
})

test('write hello to file', () => {
    const t = async () => {
        await utils.writeToFile('./word.json', 'hello');

        fs.readFile('./word.json', 'utf8', function (err, data) {
            expect(data).toStrictEqual('hello');
        });
    }

    t();
})
