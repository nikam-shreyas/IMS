#include <iostream>
using namespace std;

int main() {
	int t;
	cin>>t;
	while(t--){
	    int k,d0,d1;
	    cin>>k>>d0>>d1;
	    int s = (d0+d1);
	    long long sum = 0;
	    if(k==2){
	        sum=s%10;
	    }
	    else{
	        long long int cycles = (k-3)/4;
	        int a[5]={0,(2*s)%10,(4*s)%10,(8*s)%10,(6*s)%10};
	        sum+=s+s%10+(a[1]+a[2]+a[3]+a[4])*1LL*cycles;
	        int left = k-3-(cycles*4);
	        for(int i=1;i<=left;i++){
	            sum+=a[i];
	        }
	    }
	    if(sum%3==0)
	        cout<<"YES\n";
	   else
	   cout<<"NO\n";
	}

	// your code goes here
	return 0;
}

