import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { fetchPersonDetail, fetchCombinedCredit, fetchExternalId } from '../../features/people/peopleAction';
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";
import { url, empty, convertGender, convertBirthday, convertCurrentYear, insta, twit, fb, tiktoks, yt } from '../../utility';
import ActingMV from './acting/ActingMV.jsx';
import React from 'react';



function MoreContent() {
    const showText = document.querySelector('#more-text');
    const icons = document.querySelector('label');
    if (showText.classList.contains('hide-text')) {
        showText.classList.remove('hide-text');
        icons.style.display = 'none';
    }
    else {
        showText.classList.add('hide-text');
    }
}

export default function Persons() {

    const dispatch = useDispatch();
    const param = useParams();
    let { personDetail, combinedCredit, external } = useSelector((state) => state.people);
    const { facebook_id, instagram_id, tiktok_id, twitter_id, youtube_id } = external;
    
    const [posterCount, setPosterCount] = useState(0);
    useEffect(() => {
        dispatch(fetchPersonDetail(param.id));
        dispatch(fetchCombinedCredit(param.id));
        dispatch(fetchExternalId(param.id));
    }, [])

    useEffect(() => {
        if (combinedCredit?.cast) {
            const castcount = combinedCredit.cast?.reduce((acc, item) => {
                console.log(item?.media_type === 'movie');
                return item?.media_type ? acc + 1 : acc;
            }, 0);
            setPosterCount(castcount);                          
        };
    }, [combinedCredit?.cast]);

    const { gender, birthday, place_of_birth, also_known_as } = personDetail;

    return (
        <>
            <div className="my-[120px] px-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* person profile_path */}
                    <div className="w-full md:w-[26%] ">

                        <img className="rounded-xl" src={personDetail?.profile_path ? url + personDetail?.profile_path : empty} alt="" />

                        <div className="py-6 flex items-center gap-6">
                            <Link className={`custom-drop-shadow p-2 cursor-pointer ${facebook_id ? facebook_id : 'hidden'}`} to={fb + facebook_id} target="_blank">
                                {facebook_id ? <FaFacebook size="28px" /> : ''}
                            </Link>

                            <Link className={`custom-drop-shadow p-2 cursor-pointer ${twitter_id ? twitter_id : 'hidden'}`} to={twit + twitter_id} target="_blank">
                                {twitter_id ? <FaXTwitter size="28px" /> : ''}
                            </Link>

                            <Link className={`custom-drop-shadow p-2 cursor-pointer ${instagram_id ? instagram_id : 'hidden'}`} to={insta + instagram_id} target="_blank">
                                {instagram_id ? <FaInstagram size="28px" /> : ''}
                            </Link>

                            <Link className={`custom-drop-shadow p-2 cursor-pointer ${tiktok_id ? tiktok_id : 'hidden'}`} to={tiktoks + tiktok_id} target="_blank">
                                {tiktok_id ? <FaTiktok size="28px" /> : ''}
                            </Link>

                            <Link className={`custom-drop-shadow p-2 cursor-pointer ${youtube_id ? youtube_id : 'hidden'}`} to={yt + youtube_id} target="_blank">
                                {youtube_id ? <IoLogoYoutube size="28px" /> : ''}
                            </Link>
                        </div>

                        <div className="flex flex-col gap-6">

                            <p className="text-2xl">Personal Info</p>
                            <div>
                                <strong className="text-xl">Known For</strong>
                                <p className="text-sm">{personDetail?.known_for_department}</p>
                            </div>

                            <div className="flex flex-col">
                                <strong className="text-xl">Gender</strong>
                                <p className="text-sm">{convertGender(gender) || 'Unknown'}</p>
                            </div>

                            <div>
                                <strong className="text-xl">Known Credits</strong>
                                <p className="text-sm">{posterCount || 1}</p>
                            </div>

                            <div>
                                <strong className="text-xl">Birthday</strong>
                                <p className="text-sm">{convertBirthday(birthday) || 'YYYY-MM-DD'} ({convertCurrentYear(birthday)} years old)</p>
                            </div>

                            <div>
                                <strong className="text-xl">Place of Birth</strong>
                                <p className="text-sm">{place_of_birth}</p>
                            </div>

                            <div>
                                <strong className="text-xl">Also Known As</strong>
                                <div className="text-sm block  cursor-pointer">{also_known_as?.flatMap((item, index) => {
                                    return (<p key={index} className="hover:underline py-1 block w-fit">{item?.split(', ')}</p>)
                                })}</div>
                            </div>

                        </div>

                    </div>


                    {/* Get the combined movie and TV credits that belong to a person. */}
                    <section className="flex flex-col gap-2 w-full md:w-[70%] overflow-hidden ">
                        <Link to={`/popular-person`} className="custom-active text-4xl md:text-5xl font-[800] px-2">
                            {personDetail?.name}
                        </Link>

                        <div id="more-text" className="hide-text my-2 px-2">
                            <p className="text-xl md:text-2xl">Biography</p>
                            <p>{personDetail?.biography || <p className="text-gray-500">No Biography</p>}</p>
                        </div>

                        <div className="flex items-center justify-end rounded-md px-2">
                            <label
                                className={`cursor-pointer px-2 py-1 text-blue-500 hover:brightness-200`}
                                onClick={MoreContent}
                                htmlFor="more-text"
                            >
                                Read more
                            </label>
                        </div>

                        <div className="flex flex-col gap-6">

                            <div className="font-[600] text-lg md:text-xl px-2">
                                <p>Known For</p>
                            </div>

                            <div className="flex items-center overflow-x-auto gap-6 py-10 px-16">
                                {
                                    combinedCredit.cast?.slice(0, 8)?.map((item) => {
                                        const {
                                            id,
                                            original_title,
                                            name,
                                            poster_path,
                                            credit_id,
                                            media_type,
                                        } = item;
                                        return (
                                            <Link
                                                to={media_type === "movie" ? `/movie-details/${id}` : `/tv-details/${id}`}
                                                className="flex flex-col h-[300px] md:h-[400px] flex-shrink-0 justify-start overflow-hidden custom-drop-shadow w-[150px] md:w-[200px] cursor-pointer hover:scale-105"
                                                key={credit_id}>
                                                <img className="h-[80%] md:h-[85%] rounded-xl object-cover " src={poster_path ? url + poster_path : empty} alt={credit_id} />
                                                <p className="text-ellipsis h-[15%] py-4 px-2 justify-self-start text-sm md:text-base">
                                                    {original_title || name}
                                                </p>
                                            </Link>
                                        );
                                    })
                                }
                            </div>

                            <div>

                                <aside>
                                    <ActingMV />
                                </aside>
                             
                            </div>

                        </div>
                    </section>
                </div>
            </div>

        </>
    )
}