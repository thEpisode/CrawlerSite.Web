using System;
using System.Collections.Generic;
using System.Linq;

namespace CrawlerSite.Utils
{
    public static class GetType
    {
        public static T IsBool<T>(T defaultValue)
        {
            // Need to use typeof to get a Type object for bool, just as with T
            if (typeof(T) == typeof(bool)) {
                // Need to say "get out of my way C#"
                // The first cast to object is required as true (bool) is
                // otherwise not castable to an unrestricted T.
                // This widen-restrict approach could result in a cast error,
                // but from the above check it is known that T is bool.
                return (T)(object)true;
            }
            return (T)(object)false;
        }
    }
}