import { filterProviders } from "@/app/helper";
import { MOVIEDB } from "@/app/server/tmdb";

export async function POST(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("time_window");
  const total = parseInt(searchParams.get("total"));
  const providersData = await req.json();

  try {
    let request = await MOVIEDB.trending({
      media_type: "movie",
      time_window: query,
    });

    if (request) {
      let data = (await request).results.slice(0, total);
      let trending_data: any = data;

      trending_data = await filterProviders(providersData, trending_data);

      return Response.json({
        trending_data
      });
    }
  } catch (error) {
    console.error(error);
  }
}
