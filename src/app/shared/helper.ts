export function randomNumber(num?: number): number {
    const cSharpIntMax = 2147483647;

    num = num ? num : cSharpIntMax;
    return Math.floor(Math.random() * Math.floor(num - 1));
}