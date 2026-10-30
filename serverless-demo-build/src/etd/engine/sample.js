/**
 * Up to `count` of `items`, picked at random (reservoir sampling), and how
 * many items there were. Every item is equally likely to be picked, in one
 * pass, so it works on a generator too. All of them, in order, when there
 * are no more than `count`.
 *
 * A random sample, not the first or top-ranked ones: a query's top results
 * bunch in a few repositories, so counting them misjudges the rest (for
 * "sea ice", the top 3,000's five biggest repositories had 3 of the true
 * five; 3,000 at random had all five).
 */
export function sampleOf(items, count, random = Math.random) {
    const picked = [];
    let of = 0;
    for (const item of items) {
        of += 1;
        if (picked.length < count) {
            picked.push(item);
        }
        else {
            const at = Math.floor(random() * of);
            if (at < count)
                picked[at] = item;
        }
    }
    return { picked, of };
}
