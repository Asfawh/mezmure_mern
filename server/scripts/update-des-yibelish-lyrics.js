import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Song from '../models/song.model.js';
import dbConnect from '../config/mongoose.config.js';

dotenv.config();

const verses = `ማርያም(፫)ደስ ይበልሽ

በገብርኤል ሰላምታ

ባንቺ ስላደረ የዓለም ሁሉ ጌታ(፪)

የአምላክ ቸርነቱ ፈቃዱ ሲሆን
ጨለማው ተገፎ ሲመጣ ብርሃን
መድኃኒት ሲመጣ ሰይጣን እንዳፈረ
የዜናው አብሳሪ ገብርኤል ነበረ

አዝ

ድንግል ተቀምጣ በቤተ መቅደስ
ሐርን ወርቅ አስማምታ ስትፈትል ንግሥት
ገብርኤል(፪)ዜናዊ ሐዲስ
የአምላክን መወለድ ሥጋ በመልበስ

አዝ

ገብርኤል ሲያበስራት ድንግል ስትሰማ
በእርሷ ላይ አደረ የመለኮት ግርማ
እውነተኛ መልአክ መሆኑን ስላየች
ይሁንልኝ ብላ ቃሉን ተቀበለች

አዝ`;

await dbConnect();
const updated = await Song.findByIdAndUpdate(
  '6a68577c3645349e3e39ca7d',
  { $set: { verses } },
  { new: true, runValidators: true },
).lean();

if (!updated) throw new Error('Song not found');
console.log(`Updated ${updated.songName} (${updated._id})`);
await mongoose.disconnect();
