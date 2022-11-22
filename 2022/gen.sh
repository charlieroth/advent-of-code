for i in {1..25}
do
    if [ $i -lt 10 ]
    then
        touch "Day0$i.livemd"
    else
        touch "Day$i.livemd"
    fi
done