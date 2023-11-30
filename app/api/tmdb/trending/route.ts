import { MOVIEDB } from "@/app/server/tmdb";

export async function GET() {
  let localization = 'US';
  let primary_release_year = 2023;
  let sort_by = 'popularity.desc'
  
  return Response.json({
    status: 200,
  });
}
