import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  Star,
  Music,
  Sparkles,
  Heart,
  Share2,
} from "lucide-react";

export default function ConcertPoster() {
  const eventDetails = {
    title: "NEON NIGHTS",
    subtitle: "Electronic Music Festival",
    artist: "DJ SYNTHWAVE",
    supportingActs: ["AURORA BEATS", "CYBER PULSE", "NEON DREAMS"],
    date: "SATURDAY, JUNE 15TH",
    time: "8:00 PM - 2:00 AM",
    venue: "ELECTRIC ARENA",
    location: "Downtown Los Angeles",
    price: "From $45",
    description:
      "Experience the ultimate electronic music journey with world-class DJs, mind-blowing visuals, and an unforgettable atmosphere.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 p-4 @container">
      <div className="max-w-md mx-auto bg-gradient-to-br from-black/80 to-purple-900/60 rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/30 backdrop-blur-sm">
        {/* Header with Glow Effect */}
        <div className="relative p-8 pb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-3xl"></div>
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-4 py-2 rounded-full text-xs font-bold mb-4 animate-pulse">
              <Sparkles className="w-4 h-4" />
              LIVE EVENT
              <Sparkles className="w-4 h-4" />
            </div>

            <h1 className="text-4xl @sm:text-5xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text leading-tight mb-2 tracking-wider">
              {eventDetails.title}
            </h1>

            <p className="text-cyan-300 text-lg font-semibold tracking-widest">
              {eventDetails.subtitle}
            </p>
          </div>
        </div>

        {/* Main Artist */}
        <div className="px-8 py-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-y border-cyan-400/30">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Music className="w-6 h-6 text-pink-400" />
              <span className="text-white/70 text-sm font-medium tracking-wide">
                HEADLINER
              </span>
              <Music className="w-6 h-6 text-pink-400" />
            </div>

            <h2 className="text-3xl @sm:text-4xl font-black text-white mb-4 tracking-wider">
              {eventDetails.artist}
            </h2>

            <div className="space-y-2">
              <p className="text-cyan-300 text-sm font-medium mb-2">
                SUPPORTING ACTS:
              </p>
              {eventDetails.supportingActs.map((act, index) => (
                <div
                  key={index}
                  className="text-white/80 text-sm font-semibold tracking-wide"
                >
                  {act}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="px-8 py-6 space-y-6">
          {/* Date & Time */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">
                  {eventDetails.date}
                </p>
                <p className="text-cyan-300 text-sm">{eventDetails.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">
                  {eventDetails.venue}
                </p>
                <p className="text-cyan-300 text-sm">{eventDetails.location}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 border border-cyan-400/20">
            <p className="text-white/80 text-sm leading-relaxed">
              {eventDetails.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30">
              <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <p className="text-white font-bold text-lg">5000+</p>
              <p className="text-cyan-300 text-xs">Expected</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
              <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-bold text-lg">6 HRS</p>
              <p className="text-purple-300 text-xs">Non-Stop</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-xl border border-pink-400/30">
              <Star className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-white font-bold text-lg">4.9</p>
              <p className="text-pink-300 text-xs">Rating</p>
            </div>
          </div>
        </div>

        {/* Ticket Price & Actions */}
        <div className="px-8 py-6 bg-gradient-to-r from-black/60 to-purple-900/40 border-t border-cyan-400/30">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Ticket className="w-6 h-6 text-cyan-400" />
              <span className="text-2xl font-black text-white">
                {eventDetails.price}
              </span>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold py-4 px-6 rounded-2xl hover:from-cyan-300 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25 transform hover:scale-105">
                GET TICKETS NOW
              </button>

              <div className="flex gap-3">
                <button className="flex-1 bg-white/10 text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 border border-white/20">
                  <Heart className="w-4 h-4" />
                  Save
                </button>
                <button className="flex-1 bg-white/10 text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 border border-white/20">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
          {/* Floating orbs */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-8 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-4 w-12 h-12 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
