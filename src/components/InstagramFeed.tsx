import React, { useState } from 'react';
import { Heart, MessageCircle, Send, CheckCircle2, Bookmark, PlusCircle, X, ThumbsUp, Camera } from 'lucide-react';
import { CONFIG } from '../config';

interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  commentsCount: number;
  caption: string;
  client: string;
  location: string;
  tags: string[];
  comments: { user: string; text: string; time: string }[];
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    imageUrl: 'https://images.unsplash.com/photo-1610030470298-4089dfc98ee0?q=80&w=600&auto=format&fit=crop',
    likes: 412,
    commentsCount: 28,
    client: 'priya_ramesh_wedding',
    location: 'Leela Palace, Chennai',
    caption: 'My absolute dream Kanchipuram bridal look! The pre-pleating saved us so much wedding-morning anxiety. Draped in exactly 3 minutes. Truly a lifesaver! 🌸💍 #chennaibride #tuckandpin',
    tags: ['kanchipuram', 'bridalpleating', 'chennaiwedding'],
    comments: [
      { user: 'ananth_k', text: 'You looked absolutely stunning Priya! The pleating is so neat.', time: '2h' },
      { user: 'lakshmi_sridhar', text: 'Literally did not see any safety pin showing. Such perfection!', time: '5h' },
      { user: 'tuckandpin', text: 'Thank you for trusting our atelier, Priya! Wishing you a lifetime of joy! ❤️', time: '1d' },
    ],
  },
  {
    id: 'post-2',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    likes: 318,
    commentsCount: 14,
    client: 'divya_krishna94',
    location: 'Nungambakkam Studio, Chennai',
    caption: 'This is the Banarasi georgette after 12 whole hours of heavy dancing and reception hosting! Not a single crease out of place. The hip box pleat formula belongs in a mathematics textbook. 📐✨',
    tags: ['banarasi', 'georgette', 'perfectdrapes'],
    comments: [
      { user: 'preethi_nair', text: 'Okay, how did you get it to look that flat on the hips? Witchcraft!', time: '1d' },
      { user: 'divya_krishna94', text: '@preethi_nair tucked and pinned completely cured! No tummy bulk at all.', time: '1d' },
    ],
  },
  {
    id: 'post-3',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
    likes: 289,
    commentsCount: 19,
    client: 'meera_sharma_academy',
    location: 'Mylapore Club, Chennai',
    caption: 'Conducted a full-day seminar today in my pre-pleated organza! Saree slips are usually my nightmare but Tuck & Pin holds it like literal armor. Highly recommend their Office Pack. 💼✨',
    tags: ['organzasaree', 'professionalwear', 'drapes'],
    comments: [
      { user: 'chitra_g', text: 'Beautiful! Organza is so hard to pleat normally.', time: '4h' },
    ],
  },
  {
    id: 'post-4',
    imageUrl: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=600&auto=format&fit=crop',
    likes: 542,
    commentsCount: 42,
    client: 'harini_bridal_diaries',
    location: 'Esthell Manor, East Coast Road',
    caption: 'Our double-pallu fusion look for yesterday’s luxury wedding. Secured by the master team using custom silk-protection locks. Zero damage to the vintage zari thread work!',
    tags: ['bridalmakeup', 'doublepallu', 'zarisilk'],
    comments: [
      { user: 'archana_studios', text: 'Absolute perfection Harini! Safe needle caps are a genius invention.', time: '12h' },
    ],
  },
  {
    id: 'post-5',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
    likes: 195,
    commentsCount: 8,
    client: 'shruthi_iyengar_vlogs',
    location: 'Adyar River Heights, Chennai',
    caption: 'First time trying Dunzo delivery for saree pleating. Handed it over at 9 AM, received it back fully boxed, steam-cured, and ready inside a silk dustbag by 2 PM. Incredible service!',
    tags: ['dunzoexpress', 'pleatinghacks', 'fastdelivery'],
    comments: [
      { user: 'sneha_rao', text: 'This sounds extremely convenient. Doing this for my housewarming next week!', time: '30m' },
    ],
  },
  {
    id: 'post-6',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop',
    likes: 476,
    commentsCount: 31,
    client: 'ananya_vijayakumar',
    location: 'ITC Grand Chola, Chennai',
    caption: 'Pure traditional heavy silk drape for the morning muhurtham! I was worried the pleats would look too mechanical but they flow incredibly naturally when walked in. ❤️',
    tags: ['traditionalbride', 'muhurtham', 'kanchipuramsaree'],
    comments: [
      { user: 'soundarya_p', text: 'Oh my, looking classic! The pleats fell so gracefully.', time: '3h' },
    ],
  },
];

export default function InstagramFeed() {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followerCount, setFollowerCount] = useState<number>(CONFIG.instagramFollowersCount);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [localPosts, setLocalPosts] = useState<InstagramPost[]>(INSTAGRAM_POSTS);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedPost) return;

    const updatedPosts = localPosts.map((post) => {
      if (post.id === selectedPost.id) {
        const newlyAdded = {
          user: 'you_guest_reviewer',
          text: newComment.trim(),
          time: '1s',
        };
        const nextComments = [...post.comments, newlyAdded];
        const nextPost = {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: nextComments,
        };
        // Also update selected post to show comment instantly in detail view
        setSelectedPost(nextPost);
        return nextPost;
      }
      return post;
    });

    setLocalPosts(updatedPosts);
    setNewComment('');
  };

  const handleLikePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  return (
    <section className="space-y-6 pt-4 border-t border-brand-blush/20">
      
      {/* Instagram Header Bar */}
      <div className="bg-[#FAF7F9] border border-[#F2D6E4]/40 rounded-3xl p-5 sm:p-6 font-sans flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Segment: Avatar + Handle info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-0.5 shadow-sm shrink-0">
            <div className="h-full w-full bg-white rounded-full p-0.5 flex items-center justify-center">
              <div className="h-full w-full bg-[#6B1F4A] rounded-full flex items-center justify-center text-white font-serif font-extrabold text-sm tracking-tighter">
                T&P
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
              <h3 className="font-bold text-sm text-neutral-dark tracking-tight">tuckandpin</h3>
              <CheckCircle2 className="w-4 h-4 text-[#0095F6] fill-[#0095F6] text-white" />
            </div>
            <p className="text-[10px] text-brand-rose font-bold">@tuckandpin</p>
            <div className="text-[11px] text-neutral-dark mt-1 space-y-0.5 font-medium leading-relaxed">
              <p>🥇 Premium Saree Pre-Pleating & Box Folding • Chennai</p>
              <p className="text-[10px] text-neutral-mid">📦 Safe Home Collection & Dunzo Delivery Across Chennai</p>
            </div>
          </div>
        </div>

        {/* Middle Segment: Stats */}
        <div className="flex gap-6 sm:gap-10 text-center select-none">
          <div>
            <span className="font-bold text-xs sm:text-sm text-neutral-dark block">
              {CONFIG.instagramPostsCount.toLocaleString()}
            </span>
            <span className="text-[9px] text-neutral-mid uppercase tracking-wider block">Posts</span>
          </div>
          <div>
            <span className="font-bold text-xs sm:text-sm text-neutral-dark block">
              {followerCount.toLocaleString()}
            </span>
            <span className="text-[9px] text-neutral-mid uppercase tracking-wider block">Followers</span>
          </div>
          <div>
            <span className="font-bold text-xs sm:text-sm text-neutral-dark block">
              {CONFIG.instagramFollowingCount.toLocaleString()}
            </span>
            <span className="text-[9px] text-neutral-mid uppercase tracking-wider block">Following</span>
          </div>
        </div>

        {/* Right Segment: Follow Call to Action Button */}
        <div>
          <button
            onClick={handleFollowToggle}
            className={`px-5 py-2.5 rounded-full text-xs font-bold font-sans cursor-pointer transition-all ${
              isFollowing
                ? 'bg-[#EFEFEF] hover:bg-neutral-300 text-neutral-dark'
                : 'bg-brand-plum text-white hover:bg-purple-950 shadow-sm'
            }`}
          >
            {isFollowing ? 'Following ✓' : 'Follow @Instagram'}
          </button>
        </div>
      </div>

      {/* Grid of Instagram Client Diaries (6 interactive posts) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {localPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="aspect-square rounded-2xl border border-brand-blush/30 overflow-hidden relative group cursor-pointer shadow-3xs"
          >
            {/* Saree image */}
            <img
              src={post.imageUrl}
              alt="Client Instagram drape"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Hover actions & stats overlay */}
            <div className="absolute inset-0 bg-[#6b1f4a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6 text-white z-10 backdrop-blur-3xs">
              <button
                onClick={(e) => handleLikePost(post.id, e)}
                className="flex items-center gap-1.5 focus:scale-110 active:scale-95 transition-transform"
                title="Double tap to like"
              >
                <Heart className="w-5 h-5 fill-white text-white filter drop-shadow-sm" />
                <span className="text-xs font-bold font-sans">{post.likes}</span>
              </button>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-5 h-5 fill-white text-white filter drop-shadow-sm" />
                <span className="text-xs font-bold font-sans">{post.commentsCount}</span>
              </div>
            </div>

            {/* Micro handles tag with defensive word break to prevent cutting off names on narrow screens */}
            <span className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/70 backdrop-blur-3xs py-1 px-1.5 rounded-md text-[8.5px] sm:text-[10px] text-white font-sans font-medium z-10 break-all line-clamp-1 text-center">
              @{post.client}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center pt-3">
        <p className="text-[10px] text-neutral-mid flex items-center justify-center gap-1.5 justify-center font-sans">
          <Camera className="w-4 h-4 text-brand-rose" />
          Click on any photo grid above to view actual comments, locations, and read bridal reviews live.
        </p>
      </div>

      {/* Lightbox / Post details Modal */}
      {selectedPost && (
        <div
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 bg-black/80 z-[10005] flex items-center justify-center p-4 backdrop-blur-xs font-sans cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] md:max-h-[80vh] flex flex-col md:flex-row relative shadow-2xl border border-brand-blush/20 cursor-default"
          >
            
            {/* Close trigger button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-[10010] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left side: Immersive Image frame */}
            <div className="w-full md:w-1/2 aspect-video md:aspect-auto md:h-full bg-neutral-950 relative flex items-center">
              <img
                src={selectedPost.imageUrl}
                alt="Enlarged detailed review"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Double tap highlight indicator overlay */}
              <button
                onClick={(e) => handleLikePost(selectedPost.id, e)}
                className="absolute top-4 left-4 bg-brand-plum text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-xs border border-brand-rose/25 inline-flex items-center gap-1.5"
              >
                <Heart className="w-3 h-3 fill-white" />
                Like This Saree
              </button>
            </div>

            {/* Right side: Instagram post sidebar info & simulated comments roll */}
            <div className="w-full md:w-1/2 flex flex-col justify-between p-5 sm:p-6 bg-[#FAF7F9] text-left">
              
              {/* Profile Card Context */}
              <div className="pb-4 border-b border-[#F2D6E4]/40">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-brand-plum/10 text-brand-plum flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {selectedPost.client.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral-dark flex items-center gap-1">
                      {selectedPost.client}
                      <CheckCircle2 className="w-3 h-3 text-[#0095F6] fill-[#0095F6] text-white" />
                    </h4>
                    <span className="text-[9px] text-[#C2648A] font-semibold">{selectedPost.location}</span>
                  </div>
                </div>
                {/* Caption */}
                <p className="text-xs text-[#444] leading-relaxed mt-2.5 font-normal">
                  {selectedPost.caption}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedPost.tags.map((tg) => (
                    <span key={tg} className="text-[10px] text-brand-rose font-semibold bg-brand-blush/20 px-2 py-0.5 rounded-sm">
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments rollup scroll area */}
              <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4 max-h-[180px] sm:max-h-[220px]">
                {selectedPost.comments.length === 0 ? (
                  <p className="text-[11px] text-neutral-mid italic text-center py-4">Be the first to say something perfect!</p>
                ) : (
                  selectedPost.comments.map((comment, index) => (
                    <div key={index} className="flex gap-2.5 text-left items-start text-xs text-neutral-dark font-sans">
                      <div className="h-6 w-6 rounded-full bg-brand-rose/10 text-brand-rose flex items-center justify-center font-bold text-[10px] uppercase shrink-0">
                        {comment.user.charAt(0)}
                      </div>
                      <div className="bg-white rounded-2xl p-2.5 border border-brand-blush/10 flex-1 relative shadow-3xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[10px] text-neutral-dark">@{comment.user}</span>
                          <span className="text-[9px] text-neutral-mid">{comment.time}</span>
                        </div>
                        <p className="text-[11px] text-[#444] leading-relaxed font-normal">{comment.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Sticky bottom area with Like stat, bookmark and interactive inputs */}
              <div className="pt-3 border-t border-[#F2D6E4]/40 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => handleLikePost(selectedPost.id, e)}
                      className="text-[#C2648A] hover:text-brand-plum hover:scale-110 active:scale-95 transition-transform"
                      title="Like Post"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-bold text-neutral-dark font-sans leading-none flex items-center">
                      {selectedPost.likes} Loves
                    </span>
                  </div>
                  <Bookmark className="w-4 h-4 text-neutral-mid" />
                </div>

                {/* Comment Form input field */}
                <form onSubmit={handlePostComment} className="flex gap-2 relative">
                  <input
                    type="text"
                    placeholder="Write your genuine saree experience..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 bg-white border border-[#F2D6E4] rounded-full px-4 py-2 text-xs focus:ring-1 focus:ring-brand-plum focus:border-brand-plum transition-all placeholder-neutral-400 font-sans"
                  />
                  <button
                    type="submit"
                    className="h-8 w-8 bg-brand-plum hover:bg-purple-950 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors shrink-0"
                    title="Send comment"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
