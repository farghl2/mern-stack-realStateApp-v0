

export default function CreateListing() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-3 text-center">
      <h1 className="font-semibold text-3xl py-3">Create a Listing</h1>
      <form className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-3 flex-1">
          <input
            type=""
            placeholder="name"
            id="name"
            name="name"
            required
            className="rounded-lg p-3"
          />
          <textarea
            placeholder="Description"
            id="description"
            name="description"
            cols="50"
            required
            className="rounded-lg p-3"
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            name="address"
            required
            className="rounded-lg p-3"
          />
          <div className="flex items-start justify-between flex-wrap gap-5">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" defaultChecked />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking spot" className="w-5" />
              <label htmlFor="parking spot">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-4">
            <div className="flex  items-center gap-2">
              <input
                type="number"
                name="beds"
                id="beds"
                placeholder="beds"
                className="rounded-lg p-3 "
              />
              <label htmlFor="beds">Beds</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="beds"
                id="beds"
                placeholder="beds"
                className="rounded-lg p-3"
              />
              <label htmlFor="beds">Beds</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="beds"
                id="beds"
                placeholder="beds"
                className="rounded-lg p-3"
              />
              <label htmlFor="beds">Beds</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-3 items-start">
          <p className="font-semibold">
            Images:
            <span className="text-slate-500">
              The first image will be the cover (max 6)
            </span>
          </p>

          <form className=" flex p-3 mb-4 gap-3">
            <input type="file" className="border p-3 rounded-md w-full" />
            <button
              className=" border border-green-700 text-green-700 p-3 rounded-md uppercase hover:shadow-lg"
              required
              type="submit"
            >
              upload
            </button>
          </form>

          <button
            type="submit"
            className="uppercase bg-slate-600 p-3 text-white rounded-lg w-full"
          >
            creating listing
          </button>
        </div>
      </form>
    </main>
  );
}
