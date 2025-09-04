import { Phone, Mail } from "lucide-react";

export default function ContactUs() {
  return (
    <div>
      <div className="bg-white/5 p-6 rounded-2xl shadow-xl w-full">
        <h2 className="text-2xl text-white font-semibold mb-2">Talk to us!</h2>
        <p className="text-white/70 text-base mb-6">
          Feel free to contact us and we’ll get back to you as soon as we can.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5  transition">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/20">
              <Phone size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-white text-lg font-medium">Phone</p>
              <p className="text-white/80 text-sm">+91 9655739730</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5  transition">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/20">
              <Mail size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-white text-lg font-medium">Email</p>
              <p className="text-white/80 text-sm">
                prasannakumar.ls@outlook.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
