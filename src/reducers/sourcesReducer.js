export default function (state = {}, action) {
    var b = state;
    switch (action.type) {
        case "SOURCE_ADDED":
            var a = action.payload;
            a.isFav = true;
            if (Object.keys(b).length === 0) {
                b[0] = a;
                return { ...b };
            }
            var index =
                Math.max(
                    ...Object.keys(b).map((x) => {
                        return parseInt(x, 10);
                    })
                ) + 1;
            b[index] = a;
            return { ...b };

        case "SOURCE_REMOVED":
            delete b[
                Object.keys(b)[
                    Object.values(b).findIndex(
                        (x) => x.url === action.payload.url
                    )
                ]
            ];
            return { ...b };
        default:
            return state;
    }
}
