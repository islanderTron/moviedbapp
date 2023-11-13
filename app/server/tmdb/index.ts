// https://github.com/grantholle/moviedb-promise
import * as dotenv from "dotenv";
dotenv.config();

const { TMDB_KEY } = process.env;

const { MovieDb } = require("moviedb-promise");
const moviedb = new MovieDb(TMDB_KEY);

export const MOVIEDB = moviedb;