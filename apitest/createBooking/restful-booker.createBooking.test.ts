import { expect, test } from "playwright/test";
import bookingData = require("../../test-data/post-booking.json");

test("Create Booking", async ({ request, baseURL }) => {
  const response = await request.post(`${baseURL}/booking`, {
    data: bookingData,
  });

  const responseBody = await response.json();
  process.env.BOOKING_ID_1 = responseBody.bookingid;

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  expect(responseBody.booking).toHaveProperty(
    "firstname",
    bookingData.firstname
  );
  expect(responseBody.booking).toHaveProperty("lastname", bookingData.lastname);
  expect(responseBody.booking).toHaveProperty(
    "totalprice",
    bookingData.totalprice
  );
  expect(responseBody.booking).toHaveProperty(
    "depositpaid",
    bookingData.depositpaid
  );
  expect(responseBody.booking).toHaveProperty(
    "additionalneeds",
    bookingData.additionalneeds
  );
});
